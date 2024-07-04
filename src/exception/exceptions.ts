import { HttpException } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor() {
      super('User Not Found', 404);
    }
  }


export class ProjectNotFoundException extends HttpException {
    constructor() {
        super('Project Not Found', 404);
    }
}

export class TaskNotFoundException extends HttpException {
    constructor() {
        super('Task Not Found', 404);
    }
}