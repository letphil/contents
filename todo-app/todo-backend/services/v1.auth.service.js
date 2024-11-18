"use strict";

const DbMixin = require("../mixins/db.mixin");
const { MoleculerClientError } = require("moleculer").Errors;

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "auth",
	version: 1,
	mixins: [DbMixin("auth")],

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
		signup: {
			rest: "POST /signup",
			params: {
				email: { type: "string" },
				password: { type: "string" },
			},
			async handler(ctx) {
				try {
					const { email, password } = ctx.params;

					return {
						message: "signed up successfully",
					};
				} catch (error) {
					throw new MoleculerClientError(error.toString());
				}
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {},

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
