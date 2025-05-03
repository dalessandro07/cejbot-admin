CREATE TABLE `licencias` (
	`id` integer PRIMARY KEY NOT NULL,
	`licencia` text NOT NULL,
	`cliente` text NOT NULL,
	`telefono` text,
	`creacion` text,
	`renovacion` text,
	`expiracion` text,
	`activo` integer DEFAULT 1 NOT NULL,
	`dispositivo` text,
	`plan` text DEFAULT 'basico'
);
