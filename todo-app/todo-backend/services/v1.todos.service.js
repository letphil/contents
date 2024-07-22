"use strict";

const DbMixin = require("../mixins/db.mixin");
const { MoleculerClientError } = require("moleculer").Errors;

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "todos",
	version: 1,
	mixins: [DbMixin("todos")],

	/**
	 * Settings
	 */
	settings: {
		fields: [
			"_id",
			"task",
			"status", // NOT_STARTED, IN_PROGRESS, COMPLETED
			"createdAt",
			"updatedAt",
			"deletedAt",
		],
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		/**
		 * @description - health check for v1.todos.service
		 */
		healthCheck: {
			rest: "GET /ping",
			handler() {
				return "pong";
			},
		},

		// add task
		addTask: {
			rest: "POST /add-task",
			params: {
				task: { type: "string", optional: false },
			},
			async handler(ctx) {
				try {
					const task = ctx.params.task;
					const todo = this.todoItem(task);

					const insertTodoItem = await this.adapter.insert(todo);

					if (!insertTodoItem) throw "Something went wrong...";

					return insertTodoItem;
				} catch (error) {
					throw new MoleculerClientError(error.toString());
				}
			},
		},

		// get tasks
		getTasks: {
			rest: "GET /get-tasks/:taskId?",
			params: {
				taskId: { type: "string", optional: true },
				status: {
					type: "string",
					optional: true,
					enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
				},
			},
			async handler(ctx) {
				try {
					if (ctx.params.taskId)
						return await this.getById(ctx.params.taskId);

					let q = { deletedAt: null };

					if (ctx.params.status) q.status = ctx.params.status;

					return this.adapter.find({
						query: q,
						sort: ["-createdAt"],
					});
				} catch (error) {
					throw new MoleculerClientError(error.toString());
				}
			},
		},

		// update task
		updateTask: {
			rest: "PUT /update-task/:taskId",
			params: {
				taskId: { type: "string", optional: false },
				task: { type: "string", optional: false },
			},
			async handler(ctx) {
				try {
					const { taskId, task } = ctx.params;
					const update = await this.adapter.updateById(taskId, {
						$set: {
							task,
							updatedAt: new Date().toISOString(),
						},
					});

					if (!update) throw "something went wrong...";

					return update;
				} catch (error) {
					throw new MoleculerClientError(error.toString());
				}
			},
		},

		updateStatus: {
			rest: "PUT /update-status/:taskId",
			params: {
				taskId: { type: "string", optional: false },
				status: {
					type: "string",
					optional: false,
					enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
				},
			},
			async handler(ctx) {
				try {
					const { taskId, status } = ctx.params;
					const update = await this.adapter.updateById(taskId, {
						$set: {
							status,
							updatedAt: new Date().toISOString(),
						},
					});

					if (!update) throw "something went wrong...";

					return update;
				} catch (error) {
					throw new MoleculerClientError(error.toString());
				}
			},
		},

		// delete task
		deleteTask: {
			rest: "DELETE /delete-task/:taskId",
			params: {
				taskId: { type: "string", optional: false },
			},
			async handler(ctx) {
				try {
					const now = new Date().toISOString();
					const update = await this.updateTodoItem(
						ctx.params.taskId,
						"deletedAt",
						now
					);

					return update;
				} catch (error) {
					throw new MoleculerClientError(error.toString());
				}
			},
		},

		recoverTask: {
			rest: "GET /recover-task/:taskId",
			params: {
				taskId: { type: "string", optional: false },
			},
			async handler(ctx) {
				try {
					const getTask = await this.getById(ctx.params.taskId);
					if (!getTask) throw "task not found";
					if (!getTask.deletedAt) throw "task is not deleted";

					const recover = await this.adapter.updateById(
						ctx.params.taskId,
						{
							$set: {
								deletedAt: null,
								updatedAt: new Date().toISOString(),
							},
						}
					);

					return recover;
				} catch (error) {
					throw new MoleculerClientError(error.toString());
				}
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {
		todoItem(task) {
			const now = new Date().toISOString();
			return {
				task,
				status: "NOT_STARTED",
				createdAt: now,
				updatedAt: now,
				deletedAt: null,
			};
		},

		/**
		 *
		 * @param {string} field task, status, deletedAt
		 * @param {string} value
		 */
		async updateTodoItem(_id, field, value) {
			const now = new Date().toISOString();
			const update = await this.adapter.updateById(_id, {
				$set: {
					[field]: value,
					updatedAt: now,
				},
			});

			return update;
		},
	},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Service created lifecycle event handler
	 */
	created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
};
