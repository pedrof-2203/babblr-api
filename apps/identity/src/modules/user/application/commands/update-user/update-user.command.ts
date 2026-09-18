export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly emailAddress?: string,
    public readonly passwordHash?: string
  ) {}
}
