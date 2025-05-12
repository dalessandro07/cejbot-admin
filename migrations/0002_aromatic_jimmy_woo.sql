CREATE TABLE `anuncios` (
	`id` integer PRIMARY KEY NOT NULL,
	`titulo` text NOT NULL,
	`contenido` text NOT NULL,
	`fecha_publicacion` text,
	`activo` integer DEFAULT 1 NOT NULL,
	`importante` integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE `pagos` ALTER COLUMN "medio_pago" TO "medio_pago" text NOT NULL DEFAULT 'transferencia';