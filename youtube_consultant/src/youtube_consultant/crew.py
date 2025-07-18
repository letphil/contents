from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List

from crewai_tools import SerperDevTool
from pydantic import BaseModel, Field

class YoutubeChannelResearch(BaseModel):
    channel_name: str = Field(description="Name of the YouTube channel to research")
    channel_url: str = Field(description="URL of the YouTube channel to research")
    description: str = Field(description="Description of the YouTube channel")
    top_video_url: str = Field(description="URL of the top video of the YouTube channel")

class YoutubeChannelResearchList(BaseModel):
    channels: List[YoutubeChannelResearch] = Field(
        description="List of YouTube channels to research"
    )


@CrewBase
class YoutubeConsultant():
    """YoutubeConsultant crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def youtube_top_channel_researcher(self) -> Agent:
        """Agent to research top YouTube channels"""
        return Agent(
            config=self.agents_config['youtube_top_channel_researcher'],
            tools=[SerperDevTool()],
            verbose=True
        )

    @agent
    def youtube_channel_analyst(self) -> Agent:
        """Agent to analyze YouTube channels"""
        return Agent(
            config=self.agents_config['youtube_channel_analyst'],
            verbose=True
        )

    @agent
    def youtube_channel_consultant(self) -> Agent:
        """Agent to consult on YouTube channels"""
        return Agent(
            config=self.agents_config['youtube_channel_consultant'],
            verbose=True
        )
    
    @task
    def youtube_top_channel_researcher_task(self) -> Task:
        """Task for the top channel researcher"""
        return Task(
            config=self.tasks_config['youtube_top_channel_researcher_task'],
            output_pydantic=YoutubeChannelResearchList,
        )
    
    @task
    def youtube_channel_analysis_task(self) -> Task:
        """Task for the YouTube channel analyst"""
        return Task(
            config=self.tasks_config['youtube_channel_analysis_task'],
        )
    
    @task
    def youtube_channel_consultant_task(self) -> Task:
        """Task for the YouTube channel consultant"""
        return Task(
            config=self.tasks_config['youtube_channel_consultant_task'],
        )

    @crew
    def crew(self) -> Crew:
        """Define the crew for YouTube consultancy"""
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,  # Define the process for the crew
            verbose=True
        )    





