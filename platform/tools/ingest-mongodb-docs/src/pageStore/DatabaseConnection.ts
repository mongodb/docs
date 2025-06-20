export type DatabaseConnection = {
  /**
    Close the connection.

    @param force - Force close, emitting no events
   */
  close(force?: boolean): Promise<void>;
  /**
    @internal
    Drop the database. Typically used for testing and debugging purposes.
   */
  drop(): Promise<void>;

  /**
    Initialize the the database. Things like index creation should be done here.
   */
  init?(): Promise<void>;
};
