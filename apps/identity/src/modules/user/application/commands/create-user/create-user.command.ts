export class CreateUserCommand {
  constructor(
    public readonly emailAddress: string,
    public readonly plainPassword: string
  ) {}
}
