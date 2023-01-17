import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //--------------------------Clasificacion-------------------------------------
  await prisma.idiomas.createMany({
    data: [{ nombre: "Español" }, { nombre: "Ingles" }],
  });

  await prisma.tipoConocimiento.createMany({
    data: [
      {
        Nombre: "Declarativo",
        Descripcion:
          'conocimiento que se puede expresar verbalmente o a través de otro código. Es decir, "saber qué".',
      },
      {
        Nombre: "Procedimental",
        Descripcion:
          'una forma de actuar para conseguir un objetivo siguiendo unos principios, puede incluir algoritmos, pero no se limita a ellos. Es decir, "saber cómo" o "saber hacer".',
      },
      {
        Nombre: "Condicional",
        Descripcion:
          'reglas de condición-acción. Es decir, "saber cuándo y/o por qué".',
      },
      {
        Nombre: "Metacognitivo",
        Descripcion:
          'conocimientos sobre procesos cognitivos propios. Planificar, evaluar, revisar, reflexionar, etc. Por ejemplo, "saber si está bien"',
      },
    ],
  });
  await prisma.tipoInteractividad.createMany({
    data: [
      {
        Nombre: "Activo",
        Descripcion:
          "Un objeto de aprendizaje activo solicita del aprendiz que interaccione e introduzca información semánticamente significativa, que tome decisiones o realice algún tipo de actividad productiva. Todo ello no necesariamente en el contexto del propio objeto educativo.",
      },
      {
        Nombre: "Expositivo",
        Descripcion:
          " Un objeto para aprendizaje expositivo muestra información al aprendiz sin solicitar de éste ningún tipo de acción por su parte semánticamente significativa. ",
      },
      {
        Nombre: "Combinado",
        Descripcion: " eii",
      },
    ],
  });
  await prisma.destinatario.createMany({
    data: [
      {
        Nombre: "Tipo de aprendiz",
        Descripcion:
          "recoge los valores correspondientes a los diferentes tipos de estudiantes a los que puede ir dirigido un ODE",
      },
      {
        Nombre: "Agrupamiento de los alumnos",
        Descripcion:
          "grupa los valores que proporcionan la información sobre cómo deben estar organizados los destinatarios durante la utilización del objeto.",
      },
      {
        Nombre: "Expertos",
        Descripcion:
          " recoge los valores correspondientes a los tipos de gestores y/o expertos a los que también puede ir destinado un objeto digital.",
      },
    ],
  });

  await prisma.tipoRecursoEducativo.createMany({
    data: [
      {
        Nombre: "Media",
        Descripcion:
          "fotografía, ilustración, video, animación, música, efecto sonoro, locución, audio compuesto, texto narrativo, hipertexto, grafismo, media integrado",
      },
      {
        Nombre: "Sistema de representación de información y/o conocimiento",
        Descripcion:
          "base de datos, tabla, gráfico, mapa  conceptual, mapa de navegación , presentación multimedia, tutorial, diccionario digital, enciclopedia digital, publicación digital periódica, web/portal temático o corporativo, wiki, weblog",
      },
      {
        Nombre: "Aplicación informática",
        Descripcion:
          "herramienta de creación/edición multimedia, herramienta de creación/edición web, herramienta de ofimática, herramienta de programación, herramienta de análisis/organización de información/conocimiento, herramienta de apoyo a procesos/procedimientos, herramienta de gestión de aprendizaje/trabajo individual/cooperativo/ colaborativo",
      },
      {
        Nombre: "Servicio",
        Descripcion:
          " servicio de creación/edición multimedia, servicio de creación/edición web, servicio de ofimática, servicio de programación, servicio de análisis/organización de información/conocimiento, herramienta de apoyo a procesos/procedimientos, servicio de gestión de aprendizaje/trabajo individual/cooperativo/colaborativo",
      },
      {
        Nombre: "Contenido didáctico",
        Descripcion:
          "lecturas guiadas, lección magistral, comentario de texto-imagen, actividad de discusión, ejercicio o problema cerrado, caso contextualizado, problema abierto , escenario real o virtual de aprendizaje, juego didáctico, webquest, experimento, proyecto real, simulación, cuestionario, examen, autoevaluación",
      },
    ],
  });

  await prisma.nivelDeAgregacions.createMany({
    data: [
      {
        Nombre: "Nivel 1",
        Descripcion:
          " El nivel de agregación más pequeño, por ejemplo, elementos media (fotografía, sonido, etc.), sistemas de representación de información y/o conocimiento (mapa conceptual, tabla, etc.), aplicaciones informáticas y servicios.",
      },
      {
        Nombre: "Nivel 2",
        Descripcion:
          "El siguiente nivel, donde un objeto, estructuralmente, se compone de una colección de objetos de nivel 1. Funcionalmente, se caracteriza por ser el nivel más pequeño con una función didáctica explícita (diseño instruccional)",
      },
      {
        Nombre: "Nivel 3",
        Descripcion:
          "Su estructura se compone, principalmente, de una colección de objetos digitales de nivel 2 y excepcionalmente de nivel 1. Funcionalmente, debería incluir las actividades de aprendizaje/evaluación implícitas en los objetos que lo constituyen así como mapas conceptuales.",
      },
      {
        Nombre: "Nivel 4",
        Descripcion:
          "el nivel mayor de granularidad, por ejemplo, un conjunto de cursos para la obtención de un título en el que se cubre un área de conocimiento completa de un ciclo o nivel educativo determinado. Los objetos de nivel 4 se componen principalmente por objetos de nivel 3.",
      },
    ],
  });

  await prisma.tipo_Material.createMany({
    data: [
      {
        Nombre_Tipo: "Documento",
        Terminaciones: ".pdf , .docx , .xls , .xlsx , .ppt , .pptx",
      },
      { Nombre_Tipo: "Imagen", Terminaciones: ".jpg , .jpeg , .gif , .png" },
      { Nombre_Tipo: "Video", Terminaciones: ".webm , .mp4" },
      { Nombre_Tipo: "Audio", Terminaciones: ".mp3" },
      { Nombre_Tipo: "desconocido" },
    ],
  });
  const user =await prisma.usuarios.create({
    data: {
      Tipo_user: "ADMIN",
      Nombre: "Jhon",
      Genero: "HOMBRE",
      Apellidos: "fornite",
      Correo: "JhonFornite@gmail.com",
      Numero_Cuenta:"123456-78",
      Contrasena:
        "$2b$10$DYXzE6kuilXwcgSM.LIvOeebwikpwtBQSVi005kQ27BB4PCnnUsEO", //Contrasena
    },
  });
  // await prisma.materiales.createMany({
  //   data: [
  //     {
  //       AuthorID: 1,
  //       TipoMaterialId: 1,
  //       Direccion:
  //         "https://guao.org/sites/default/files/biblioteca/%C3%81lgebra%20de%20Baldor.pdf",
  //       Titulo: "Baldor",
  //       Concretado: true,
  //     },
  //     {
  //       AuthorID: 1,
  //       TipoMaterialId: 1,
  //       Direccion:
  //         "https://nickpgill.github.io/files/2014/07/libro-algebra-lineal.pdf",
  //       Titulo: "Algebra lineal",
  //       Concretado: true,
  //     },
  //     {
  //       AuthorID: 1,
  //       TipoMaterialId: 1,
  //       Direccion:
  //         "  https://catedras.facet.unt.edu.ar/lad/wp-content/uploads/sites/93/2018/04/Matem%C3%A1ticas-Discretas-6edi-Johnsonbaugh.pdf",
  //       Titulo: "matematicas discretas",
  //       Concretado: true,
  //     },
  //   ],
  // });
  await prisma.facultad.create({
    data: {
      Nombre: "Facultad de Ingeniería Mochis",
      Carreras: {
        create: {
          Nombre: "Ingenieria en software",
          Planes: {
            create: {
              Nombre: "Plan de estudios de ejemplo",
              Semestres: {
                create: {
                  Nombre: "Semestre 1",
                },
              },
            },
          },
        },
      },
    },
  });

  await prisma.materia.create({
    data: {
      Nombre: "Algrebra lineal",
      SemestreID: 1,
      Bloques: {
        create: [
          {
            Nombre: "1. Sistemas de ecuacion lineales",
            Contenido: {
              createMany: {
                data: [
                  { Titulo: "1.1 Definicion" },
                  { Titulo: "1.2 Sistemas de ecuaciones lineales" },
                  {
                    Titulo:
                      "1.3 Sistema de dos ecuaciones con incognitas(S2e2X)",
                  },
                  {
                    Titulo: "1.3.1 Solucion de problemas de la vida cotidiana",
                  },
                  /////////
                  { Titulo: "1.4 Matrices y vectores" },
                  { Titulo: "1.4.1 Definicion" },
                  { Titulo: "1.4.2 Suma, resta" },
                  {
                    Titulo:
                      "1.4.3 Multiplicación de una matriz por un escalar ",
                  },
                  /////////
                  { Titulo: "1.4.5 Producto matricia" },

                  { Titulo: "1.4.6 Matriz identidad" },
                  { Titulo: "1.4.7 Matriz inversa" },
                  { Titulo: "1.4.8 Matriz transpuesta" },

                  { Titulo: "1.4.9 Matriz triangular superior o inferior" },
                  /////
                  { Titulo: "1.5 Sistemas de M ecuaciones con N incógnitas" },
                  { Titulo: "1.5.1 Método de eliminación Gauss Jordan" },
                  { Titulo: "1.5.2 Método de eliminación Gaussiana" },
                  {
                    Titulo:
                      "1.5.3 Método deeliminación Gauss Jordan para obtener la inversa",
                  },
                  ////
                  { Titulo: "1.6 Sistemas de ecuaciones lineales homogéneos" },
                ],
              },
            },
          },
        ],
      },
    },
  });
  await prisma.cursoGuia.create({
    data: {
      Nombre: "Prueba de Guia para Grupo",
      CreadorID: 1,
      Plantilla: {
        create: {
          CreadorID:user.ID,
          Nombre: "Curso creado",
          Descripcion: "Curso Creado a partir de una plantilla",
          Bloques: {
            create: {
              Nombre: "Bloque 1",
              Descripcion: "Descripcion de bloque",
              Contenido: {
                create: {
                  Titulo: "Contenido 1.1",
                  Descripcion: "Descripcion de contenido",
                },
              },
            },
          },
        },
      },
    },
  });
  await prisma.grupo.create({
    data: {
      CreadorID: 1,
      Nombre: "Grupo 1",
      Descripcion: "Prueaba de grupo",
      Codigo: "Prueba",
      
      CursoGuia: {
        connect: [{ID:1}]
      },
    },
  });

  await prisma.bloque.create({
    data: {
      MateriaID: 1,
      Nombre: "2. Determinantes",
      Contenido: {
        createMany: {
          data: [
            { Titulo: "2.1 Definición" },
            { Titulo: "2.2 Propiedades de los determinantes" },
            ///
            { Titulo: "2.3 Sistemas de M ecuaciones con N incógnitas (SMeNx)" },
            { Titulo: "2.3.1 Método de la adjunta para obtener la inversa" },

            { Titulo: "2.3.2 Método de Cramer" },
            { Titulo: "2.2 Propiedades de los determinantes" },
          ],
        },
      },
    },
  });

  await prisma.bloque.create({
    data: {
      MateriaID: 1,
      Nombre: "3. Espacios Vectoriales",
      Contenido: {
        createMany: {
          data: [
            { Titulo: "3.5 Espacios Vectoriales" },
            { Titulo: "3.6 Subespacios" },
            ///
            { Titulo: "3.7 Combinación Lineal y Espacio Generado" },
            { Titulo: "3.8 Independencia y  dependencia lineal" },

            { Titulo: "3.9 Base y Dimensión" },
          ],
        },
      },
    },
  });

  await prisma.bloque.create({
    data: {
      MateriaID: 1,
      Nombre:
        "4. Transformaciones Lineales, valores y vectores característicos",
      Contenido: {
        createMany: {
          data: [
            {
              Titulo:
                "4.1. Definición detransformación y de transformación lineal",
            },
            { Titulo: "4.2. Dominio,recorrido y núcleo" },
            ///
            {
              Titulo:
                "4.3. Representación matricial de una transformación lineal",
            },
            { Titulo: "4.4. Álgebra de las transformaciones lineales" },
            { Titulo: "4.4. Álgebra de las transformaciones lineales" },
            { Titulo: "4.5. Transformación inversa" },
          ],
        },
      },
    },
  });

  await prisma.materia.createMany({
    data: [
      {
        SemestreID: 1,
        Nombre: "Matemáticas discretas",
      },
      {
        SemestreID: 1,
        Nombre: "Fundamentos de computación",
      },
      {
        SemestreID: 1,
        Nombre: "Comprensión y producción de textos",
      },
      {
        SemestreID: 1,
        Nombre: "Administración y contabilidad.",
      },
    ],
  });
  // await prisma.semestre.createMany({
  //   data: [
  //     { PlanID: 1, Nombre: "Semestre 2" },
  //     { PlanID: 1, Nombre: "Semestre 3" },
  //     { PlanID: 1, Nombre: "Semestre 4" },
  //     { PlanID: 1, Nombre: "Semestre 5" },
  //     { PlanID: 1, Nombre: "Semestre 6" },
  //     { PlanID: 1, Nombre: "Semestre 7" },
  //     { PlanID: 1, Nombre: "Semestre 8" },
  //     { PlanID: 1, Nombre: "Semestre 9" },
  //   ],
  // });

  // await prisma.materia.createMany({
  //   data: [
  //     {
  //       SemestreID: 2,
  //       Nombre: "Cálculo diferencial e integral",
  //     },
  //     {
  //       SemestreID: 2,
  //       Nombre: "Arquitectura de computadoras",
  //     },
  //     {
  //       SemestreID: 2,
  //       Nombre: "Sistemas de información",
  //     },
  //     {
  //       SemestreID: 2,
  //       Nombre: "Programación",
  //     },
  //     {
  //       SemestreID: 2,
  //       Nombre: "Sistemas operativos",
  //     },
  //     {
  //       SemestreID: 2,
  //       Nombre: "Costos",
  //     },
  //   ],
  // });
  // await prisma.materia.createMany({
  //   data: [
  //     {
  //       SemestreID: 3,
  //       Nombre: "Teoría de la computación",
  //     },
  //     {
  //       SemestreID: 3,
  //       Nombre: "Arquitectura de computadoras II",
  //     },
  //     {
  //       SemestreID: 3,
  //       Nombre: "Estructura de datos",
  //     },
  //     {
  //       SemestreID: 3,
  //       Nombre: "Programación II",
  //     },
  //     {
  //       SemestreID: 3,
  //       Nombre: "Probabilidad y estadística",
  //     },
  //     {
  //       SemestreID: 3,
  //       Nombre: "Valores y ética profesional",
  //     },
  //   ],
  // });
  // await prisma.materia.createMany({
  //   data: [
  //     {
  //       SemestreID: 4,
  //       Nombre: "Investigación de operaciones",
  //     },
  //     {
  //       SemestreID: 4,
  //       Nombre: "Ingeniería de software I",
  //     },
  //     {
  //       SemestreID: 4,
  //       Nombre: "Programación orientada a objetos",
  //     },
  //     {
  //       SemestreID: 4,
  //       Nombre: "Fundamentos de base de datos",
  //     },
  //     {
  //       SemestreID: 4,
  //       Nombre: "Sistemas digitales",
  //     },
  //   ],
  // });

  // await prisma.materia.createMany({
  //   data: [
  //     {
  //       SemestreID: 5,
  //       Nombre: "Ingeniería económica",
  //     },
  //     {
  //       SemestreID: 5,
  //       Nombre: "Ingeniería de software II",
  //     },
  //     {
  //       SemestreID: 5,
  //       Nombre: "Redes II",
  //     },
  //     {
  //       SemestreID: 5,
  //       Nombre: "Bases de datos distribuidas",
  //     },
  //     {
  //       SemestreID: 5,
  //       Nombre: "Metodología de la investigación",
  //     },
  //   ],
  // });
  // await prisma.materia.createMany({
  //   data: [
  //     {
  //       SemestreID: 6,
  //       Nombre: "Comprensión y producción de textos en inglés",
  //     },
  //     {
  //       SemestreID: 6,
  //       Nombre: "Desarrollo de aplicaciones web I",
  //     },
  //     {
  //       SemestreID: 6,
  //       Nombre: "Interacción humano-computadora",
  //     },
  //     {
  //       SemestreID: 6,
  //       Nombre: "Administración de proyectos de software I",
  //     },
  //     {
  //       SemestreID: 6,
  //       Nombre: "Administración de sistemas",
  //     },
  //   ],
  // });
  // await prisma.materia.createMany({
  //   data: [
  //     {
  //       SemestreID: 7,
  //       Nombre: "Software de sistemas",
  //     },
  //     {
  //       SemestreID: 7,
  //       Nombre: "Desarrollo de aplicaciones web II ",
  //     },
  //     {
  //       SemestreID: 7,
  //       Nombre: "Sistemas de apoyo a la toma de decisiones",
  //     },
  //     {
  //       SemestreID: 7,
  //       Nombre: "Administración de proyectos de software II",
  //     },
  //     {
  //       SemestreID: 7,
  //       Nombre: "Modelado de procesos",
  //     },
  //   ],
  // });
  // await prisma.materia.createMany({
  //   data: [
  //     {
  //       SemestreID: 8,
  //       Nombre: "Graficación",
  //     },
  //     {
  //       SemestreID: 8,
  //       Nombre: "Sistemas distribuidos",
  //     },
  //     {
  //       SemestreID: 8,
  //       Nombre: "Computación ubicua",
  //     },
  //     {
  //       SemestreID: 8,
  //       Nombre: "Optativa I",
  //     },
  //     {
  //       SemestreID: 8,
  //       Nombre: "nnovación de procesos NTIC",
  //     },
  //   ],
  // });
  // await prisma.materia.createMany({
  //   data: [
  //     {
  //       SemestreID: 9,
  //       Nombre: "Inteligencia artificia",
  //     },
  //     {
  //       SemestreID: 9,
  //       Nombre: "Tópicos avanzados de ingeniería de software",
  //     },
  //     {
  //       SemestreID: 9,
  //       Nombre: "Optativa II",
  //     },
  //     {
  //       SemestreID: 9,
  //       Nombre: "Optativa III",
  //     },
  //     {
  //       SemestreID: 9,
  //       Nombre: "Práctica profesional",
  //     },
  //   ],
  // }); Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
