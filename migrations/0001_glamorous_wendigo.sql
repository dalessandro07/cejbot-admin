CREATE TABLE `pagos` (
	`id` integer PRIMARY KEY NOT NULL,
	`licencia_id` integer NOT NULL,
	`fecha` text,
	`monto` real NOT NULL,
	`medio_pago` text DEFAULT 'efectivo' NOT NULL,
	`notas` text
);
