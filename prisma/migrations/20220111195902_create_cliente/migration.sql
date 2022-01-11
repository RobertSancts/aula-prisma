BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[deliveryman] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [deliveryman_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [deliveryman_username_key] UNIQUE ([username])
);

-- CreateTable
CREATE TABLE [dbo].[clients] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [clients_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [clients_username_key] UNIQUE ([username])
);

-- CreateTable
CREATE TABLE [dbo].[deliveries] (
    [id] NVARCHAR(1000) NOT NULL,
    [id_client] NVARCHAR(1000) NOT NULL,
    [id_deliveryman] NVARCHAR(1000) NOT NULL,
    [item_name] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [deliveries_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [end_at] DATETIME2 NOT NULL CONSTRAINT [deliveries_end_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [deliveries_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[deliveries] ADD CONSTRAINT [deliveries_id_client_fkey] FOREIGN KEY ([id_client]) REFERENCES [dbo].[clients]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[deliveries] ADD CONSTRAINT [deliveries_id_deliveryman_fkey] FOREIGN KEY ([id_deliveryman]) REFERENCES [dbo].[deliveryman]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
