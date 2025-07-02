-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'director',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Docente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cargaMaxima" INTEGER NOT NULL,

    CONSTRAINT "Docente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "horas" INTEGER NOT NULL,
    "tipoAula" TEXT NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" SERIAL NOT NULL,
    "letra" TEXT NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ambiente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,

    CONSTRAINT "Ambiente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disponibilidad" (
    "id" SERIAL NOT NULL,
    "dia" TEXT NOT NULL,
    "bloque" INTEGER NOT NULL,
    "docenteId" INTEGER NOT NULL,

    CONSTRAINT "Disponibilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asignacion" (
    "id" SERIAL NOT NULL,
    "docenteId" INTEGER NOT NULL,
    "grupoId" INTEGER NOT NULL,
    "ambienteId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "dia" TEXT NOT NULL,
    "bloque" INTEGER NOT NULL,

    CONSTRAINT "Asignacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ejecucion" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parametros" TEXT NOT NULL,
    "conflictos" INTEGER NOT NULL,
    "seleccionFinal" BOOLEAN NOT NULL,
    "archivoEntrada" TEXT NOT NULL,

    CONSTRAINT "Ejecucion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_email_key" ON "Docente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ambiente_nombre_key" ON "Ambiente"("nombre");

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disponibilidad" ADD CONSTRAINT "Disponibilidad_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asignacion" ADD CONSTRAINT "Asignacion_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asignacion" ADD CONSTRAINT "Asignacion_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asignacion" ADD CONSTRAINT "Asignacion_ambienteId_fkey" FOREIGN KEY ("ambienteId") REFERENCES "Ambiente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asignacion" ADD CONSTRAINT "Asignacion_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
