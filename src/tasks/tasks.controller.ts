import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch,
	Query,
	UsePipes,
	ValidationPipe,
	ParseIntPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task.types";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status.validation.pipe";
import { Task } from "./task.entity";

@Controller("tasks")
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	getTasksFilter(
		@Query(ValidationPipe) filterDto: GetTasksFilterDto,
	): Promise<Task[]> {
		return this.tasksService.getTasks(filterDto);
	}

	@Get("/:id")
	getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
		return this.tasksService.getTaskById(id);
	}

	@Delete("/:id")
	deleteTaskById(@Param("id") id: number): Promise<void> {
		return this.tasksService.deleteTaskById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
		return this.tasksService.createTask(createTaskDto);
	}

	@Patch("/:id/status")
	updateTaskStatus(
		@Param("id") id: number,
		@Body("status", TaskStatusValidationPipe) status: TaskStatus,
	): Promise<Task> {
		return this.tasksService.updateTaskStatus(id, status);
	}
}
