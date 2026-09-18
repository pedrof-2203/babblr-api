export class CreateUserCommand {
  constructor(
    public readonly displayName: string,
    public readonly emailAddress: string,
    public readonly plainPassword: string
  ) {}
}
