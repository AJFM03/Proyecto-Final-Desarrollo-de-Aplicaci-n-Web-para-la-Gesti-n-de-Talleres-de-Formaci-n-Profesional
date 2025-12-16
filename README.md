# Proyecto-Final-Desarrollo-de-Aplicaci-n-Web-para-la-Gesti-n-de-Talleres-de-Formaci-n-Profesional


🎯 Objetivo

Diseñar, provisionar y desplegar en AWS una aplicación web serverless para gestionar talleres de formación profesional, con front estático (S3/CloudFront) y backend API (API Gateway + Lambda + DynamoDB). Incluir autenticación(Cognito), eventos (EventBridge), notificaciones (SNS/SES o webhooks), observabilidad (CloudWatch/X-Ray), seguridad (WAF/IAM/Secrets), CI/CD y Infraestructura como Código (AWS CDK / AWS SAM / Terraform).

🧱 Arquitectura de Referencia (alto nivel)
Frontend estático: S3 (hosting) + CloudFront (CDN) + ACM (TLS) + Route 53 (dominio).

Autenticación: Amazon Cognito (User Pool + Hosted UI opcional).

API: Amazon API Gateway (REST) con Cognito JWT Authorizer (rutas admin protegidas).

Compute: AWS Lambda (runtime a elección) con Aliases y CodeDeploy para blue/green.

Base de datos: Amazon DynamoDB (tabla única con diseño PK/SK + GSI para consultas).

Archivos estáticos y evidencias (p. ej., brochures): S3 privado con acceso por presigned URLs.

Eventos y workflows: EventBridge para emitir WORKSHOP_CREATED, STUDENT_REGISTERED, etc.

Notificaciones: SNS/SES o Webhook (API Destination vía EventBridge) para confirmaciones.

Colas (opcional): SQS DLQ para reintentos de envíos fallidos.

Jobs programados: EventBridge Scheduler para recordatorios previos al taller.

Seguridad: WAF (CloudFront y/o API GW), IAM least-privilege, Secrets Manager, throttling/quotas en API.

Observabilidad: CloudWatch Logs/Metrics/Alarms, Tracing con AWS X-Ray, Dashboards básicos.

Cost Governance: Etiquetado (Project=Workshops, Env=Dev/Prod) + presupuestos/alertas.

🗂 Modelo de Datos (DynamoDB – ejemplo)
Tabla: workshops

PK: PK (e.g., WORKSHOP#<id> / USER#<id>)

SK: SK (e.g., META, REG#<userId>)

Atributos: name, description, category, location, startAt, endAt, status (scheduled|cancelled), capacity, createdAt, updatedAt.

GSI1: GSI1PK = WORKSHOP#ALL, GSI1SK = startAt → Listado por fecha.

GSI2 (opcional): GSI2PK = CATEGORY#<cat>, GSI2SK=startAt → Filtro por categoría.

Ítems ejemplo

Taller: PK=WORKSHOP#123, SK=META, …

Registro: PK=WORKSHOP#123, SK=REG#USER#999, userId=999, registeredAt=...

Usuario: PK=USER#999, SK=META, role=student|admin

Alternativamente, puedes usar Aurora Serverless v2 si prefieres SQL; la arquitectura no cambia.

🔗 API (contrato mínimo en API Gateway)
GET /workshops (público) – cacheable, paginado (LastEvaluatedKey).

GET /workshops/{id} (público).

POST /workshops (admin) – requiere JWT Cognito + rol admin.

PUT /workshops/{id} (admin).

DELETE /workshops/{id} (admin).

POST /workshops/{id}/register (student autenticado) – idempotente (evitar duplicados).

Buenas prácticas

Validación de entrada (API GW request validator / Lambda + schema).

Respuestas con códigos HTTP correctos y problem+json para errores.

Usage Plans/Throttling y API Keys si publican partes sin auth (opcional).

WAF delante de API (si usas regional + ALB) o en CloudFront cuando la API se publica vía distribución.

🔐 Seguridad
Cognito JWT Authorizer (API Gateway) para rutas protegidas.

IAM Policies mínimos para Lambdas (DynamoDB, S3, EventBridge, SNS…).

Secrets Manager para credenciales externas/SMTP (si usas SES no hace falta).

CORS bien configurado (dominios del CloudFront).

WAF: rate-based rule + SQLi/XSS managed rules.

S3: buckets privados (excepto el del front con OAC a CloudFront).

API Gateway: throttling por stage, request validation, access logs.

📦 Despliegue (Infraestructura como Código)
Elige uno:

AWS CDK (TS/Java/Python): stacks Network (opcional), Auth, Api, Data, Front, Observability.

AWS SAM: template.yaml con AWS::Serverless::Function, HttpApi/Api, DynamoDB, Cognito, Outputs.

Terraform: módulos por dominio (api, auth, data, front, monitoring).

Requisitos mínimos de IaC

dev y prod como stacks/stages separados.

Variables/params para nombres, dominios y cuotas.

Outputs con URLs, IDs, ARNs clave.

Políticas IAM explícitas (no usar *).

🔁 CI/CD
Repositorio Git con ramas main, dev, feature-branches y PRs con revisión.

Pipeline (elige uno):

GitHub Actions → build/test (linters), empaquetado SAM/CDK, sam deploy / cdk deploy a dev on push; prod via tag/release + aprobación manual.

AWS CodePipeline (CodeCommit o GitHub), CodeBuild + CodeDeploy (blue/green con Lambda Aliases).

Pruebas: unitarias para handlers, contract tests (OpenAPI), smoke test post-deploy (invocación a /healthz).

Blue/Green Lambdas con CodeDeploy (linear/Canary, rollback automático ante alarmas).

🧪 Observabilidad y Fiabilidad
CloudWatch Logs por función + log retention (p. ej., 30–90 días).

Alarms (p. ej., errores 5XX en API, duración y errores en Lambda, throttles).

X-Ray activado para trazabilidad (API GW + Lambda + SDK).

Dashboards: TPS, latencia P95, errores, consumo lectura/escritura DynamoDB.

DLQ (SQS) para Lambdas que procesen eventos críticos.

Retry policies (EventBridge → Lambda: reintentos y backoff).

🌐 Frontend (agnóstico de framework)
Build (React/Vue/Angular o HTML+Bootstrap).

S3 (static website desactivado; servir solo vía CloudFront con OAC).

CloudFront:

Origin 1: S3 (front).

Origin 2: API Gateway (con behaviors /api/*).

HTTPS con ACM (us-east-1).

WAF asociado.

Variables: endpoint de API y userPoolId/clientId de Cognito inyectadas en build.

📬 Notificaciones y Tareas Programadas
Registro a taller → Lambda publica STUDENT_REGISTERED en EventBridge.

Regla (EventBridge) invoca Lambda de notificación (SNS/SES o webhook a Slack/Teams).

Recordatorios: Scheduler envía evento 24h antes de startAt (consulta DDB por GSI, notifica inscritos).

Reintentos/errores: DLQ + alarmas.

🔧 Operación y Costos (orientativo)
Free/low tier si se optimiza: S3/CloudFront (front), API GW/Lambda (pago por uso), DynamoDB on-demand o RCUs/WCUs bajos, Cognito MAU bajo.

Activar AWS Budgets y alertas por e-mail (obligatorio).
