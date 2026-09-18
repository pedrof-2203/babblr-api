export class LoginCommand {
  constructor(
    public readonly emailAddress: string,
    public readonly plainPassword: string,
  ) {}
}