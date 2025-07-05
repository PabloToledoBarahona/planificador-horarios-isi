-- CreateTable
CREATE TABLE "BloqueProhibido" (
    "id" SERIAL NOT NULL,
    "docenteId" INTEGER NOT NULL,
    "dia" TEXT NOT NULL,
    "bloque" INTEGER NOT NULL,

    CONSTRAINT "BloqueProhibido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BloqueProhibido_docenteId_dia_bloque_key" ON "BloqueProhibido"("docenteId", "dia", "bloque");

-- AddForeignKey
ALTER TABLE "BloqueProhibido" ADD CONSTRAINT "BloqueProhibido_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
