// Comprehensive Network Course Interactive Application
class NetworkCourseApp {
    constructor() {
        this.currentTrack = 'traditional';
        this.currentModule = null;
        this.currentTopic = null;
        this.progress = this.loadProgress();
        
        // Data structure combining both traditional and emergent networks
        this.courseData = {
            traditional: {
                title: "Redes Tradicionales",
                modules: {
                    "1": {
                        title: "Introducción al Enrutamiento y Envío de Paquetes",
                        icon: "🔧",
                        topics: {
                            "1-1": {
                                title: "Características de un router",
                                content: "Los routers son dispositivos de capa 3 que operan en la capa de red del modelo OSI. Sus principales características incluyen: procesamiento de paquetes, determinación de rutas, tabla de enrutamiento, interfaces múltiples, y funciones de conmutación.",
                                commands: ["show ip route", "show ip interface brief", "show running-config"],
                                keyPoints: ["Opera en Capa 3 del OSI", "Mantiene tabla de enrutamiento", "Examina direcciones IP destino", "Funciones de conmutación"]
                            },
                            "1-2": {
                                title: "Configuración y direccionamiento",
                                content: "La configuración básica incluye: asignación de direcciones IP a interfaces, configuración de máscaras de subred, establecimiento de rutas, y configuración de protocolos de enrutamiento.",
                                commands: ["interface fastethernet 0/0", "ip address 192.168.1.1 255.255.255.0", "no shutdown"],
                                keyPoints: ["Asignación IP a interfaces", "Configuración máscaras", "Esquema jerárquico", "Optimización enrutamiento"]
                            },
                            "1-3": {
                                title: "Construcción de la tabla de enrutamiento",
                                content: "Las tablas de enrutamiento se construyen mediante: redes conectadas directamente, rutas estáticas configuradas manualmente, y protocolos de enrutamiento dinámico.",
                                commands: ["show ip route", "show ip route connected", "show ip route static"],
                                keyPoints: ["Redes conectadas directamente (AD: 0)", "Rutas estáticas (AD: 1)", "Protocolos dinámicos", "Contiene destino, máscara, siguiente salto y métrica"]
                            },
                            "1-4": {
                                title: "Determinación de la ruta y funciones de conmutación",
                                content: "El proceso incluye: búsqueda en la tabla de enrutamiento, aplicación del algoritmo de coincidencia más larga, selección de la mejor ruta basada en distancia administrativa y métrica.",
                                commands: ["debug ip routing", "show ip cef", "show adjacency"],
                                keyPoints: ["Búsqueda en tabla", "Coincidencia más larga", "Selección por AD y métrica", "Reenvío por interfaz apropiada"]
                            }
                        }
                    },
                    "2": {
                        title: "Enrutamiento Estático y Dinámico",
                        icon: "🛣️",
                        topics: {
                            "2-1": { 
                                title: "Routers en redes", 
                                content: "Los routers son dispositivos fundamentales que operan en la capa 3 del modelo OSI, proporcionando conectividad entre diferentes segmentos de red. Su función principal es determinar la mejor ruta para el tráfico de datos basándose en direcciones IP de destino. Los routers mantienen tablas de enrutamiento que contienen información sobre redes remotas, métricas asociadas y rutas de acceso. Además, proporcionan servicios como NAT, DHCP, y funciones de seguridad mediante ACLs.", 
                                keyPoints: ["Interconexión de redes heterogéneas", "Determinación de rutas óptimas", "Mantenimiento de tablas de enrutamiento", "Servicios adicionales (NAT, DHCP, ACLs)", "Segmentación de dominios de broadcast"],
                                commands: ["show ip route", "show ip interface brief", "show version", "show running-config"]
                            },
                            "2-2": { 
                                title: "Exploración de redes conectadas directamente", 
                                content: "Las redes conectadas directamente son aquellas que están físicamente conectadas a las interfaces del router y se configuran automáticamente cuando la interfaz está activa y tiene una dirección IP asignada. Estas rutas tienen una distancia administrativa de 0, la más confiable. El router aprende estas redes inmediatamente al activar las interfaces y las agrega automáticamente a la tabla de enrutamiento. Son la base para el aprendizaje de rutas remotas.", 
                                keyPoints: ["Redes físicamente conectadas", "Distancia administrativa 0", "Configuración automática", "Base para rutas remotas", "Activación mediante 'no shutdown'"],
                                commands: ["show ip route connected", "show ip interface brief", "interface fastethernet 0/0", "ip address 192.168.1.1 255.255.255.0", "no shutdown"]
                            },
                            "2-3": { 
                                title: "Rutas estáticas con direcciones del siguiente salto", 
                                content: "Las rutas estáticas con next-hop especifican la dirección IP del siguiente router en la ruta hacia el destino. Esta configuración es ideal para enlaces punto a punto y redes Ethernet. El router debe realizar una búsqueda recursiva en la tabla de enrutamiento para determinar la interfaz de salida. Proporcionan control total sobre el enrutamiento pero requieren configuración manual y no se adaptan automáticamente a cambios en la topología.", 
                                keyPoints: ["Especificación de IP del siguiente salto", "Búsqueda recursiva requerida", "Ideal para enlaces punto a punto", "Control manual del enrutamiento", "Distancia administrativa 1"],
                                commands: ["ip route 192.168.2.0 255.255.255.0 10.0.0.2", "show ip route static", "show ip route 192.168.2.0"]
                            },
                            "2-4": { 
                                title: "Rutas estáticas con interfaces de salida", 
                                content: "Las rutas estáticas con interfaz de salida especifican directamente la interfaz por la cual el tráfico debe ser enviado. Son más eficientes en enlaces seriales punto a punto ya que no requieren búsqueda recursiva. En redes multi-acceso como Ethernet, pueden causar problemas ya que el router no sabe la dirección MAC del siguiente salto. Se recomienda combinar interfaz de salida con next-hop en redes Ethernet.", 
                                keyPoints: ["Especificación directa de interfaz", "Mayor eficiencia en enlaces seriales", "No requiere búsqueda recursiva", "Problemas en redes multi-acceso", "Recomendable combinar con next-hop"],
                                commands: ["ip route 192.168.3.0 255.255.255.0 serial 0/0/0", "ip route 192.168.4.0 255.255.255.0 fastethernet 0/1 10.0.0.2"]
                            },
                            "2-5": { 
                                title: "Clasificación de protocolos de enrutamiento dinámico", 
                                content: "Los protocolos de enrutamiento dinámico se clasifican según múltiples criterios: Por algoritmo (Vector Distancia vs Estado de Enlace), por ámbito (IGP vs EGP), y por soporte de clases (Classful vs Classless). Vector Distancia (RIP, EIGRP) intercambia tablas completas periódicamente, mientras Estado de Enlace (OSPF, IS-IS) mantiene una base de datos topológica. IGP opera dentro de un AS, EGP entre diferentes AS. Classful no soporta VLSM, Classless sí lo hace.", 
                                keyPoints: ["Vector Distancia: RIP, EIGRP", "Estado de Enlace: OSPF, IS-IS", "IGP: dentro del AS", "EGP: entre diferentes AS", "Classful: sin VLSM", "Classless: con VLSM"],
                                commands: ["show ip protocols", "show ip route", "router rip", "router ospf 1", "router eigrp 100"]
                            },
                            "2-6": { title: "Distancias administrativas", content: "La distancia administrativa es un valor que indica la confiabilidad de una fuente de información de enrutamiento. Valores: Conectada directamente (0), Estática (1), EIGRP (90), OSPF (110), RIP (120).", keyPoints: ["Conectada directamente: 0", "Estática: 1", "EIGRP: 90", "OSPF: 110", "RIP: 120", "Menor valor = mayor confianza"] }
                        }
                    },
                    "3": {
                        title: "Protocolos Vector Distancia",
                        icon: "📏",
                        topics: {
                            "3-1": { 
                                title: "Introducción vector distancia", 
                                content: "Los protocolos de vector distancia implementan el algoritmo distribuido Bellman-Ford para determinar las mejores rutas. Cada router mantiene una tabla de vectores que contiene la distancia (métrica) y dirección (siguiente salto) hacia cada red de destino conocida. Los routers comparten periódicamente sus tablas completas con vecinos directamente conectados, permitiendo que cada router construya gradualmente un mapa de la red. Este enfoque es simple pero puede resultar en convergencia lenta y problemas de bucles de enrutamiento.", 
                                keyPoints: ["Algoritmo Bellman-Ford distribuido", "Tabla de vectores distancia-dirección", "Intercambio periódico con vecinos", "Construcción gradual del mapa de red", "Convergencia lenta", "Susceptible a bucles"],
                                commands: ["show ip protocols", "show ip route", "debug ip routing"]
                            },
                            "3-2": { 
                                title: "Mantenimiento de tablas", 
                                content: "El mantenimiento de tablas en protocolos vector distancia involucra actualizaciones periódicas y triggered updates. Las actualizaciones periódicas ocurren en intervalos fijos (ej: RIP cada 30 segundos), mientras que las triggered updates se envían inmediatamente cuando hay cambios en la topología. Los routers mantienen temporizadores para detectar vecinos caídos y rutas inválidas. El proceso incluye validación de actualizaciones, cálculo de nuevas métricas y propagación de cambios.", 
                                keyPoints: ["Actualizaciones periódicas programadas", "Triggered updates por cambios", "Temporizadores de validación", "Detección de vecinos caídos", "Cálculo de métricas", "Propagación de cambios"],
                                commands: ["show ip route", "show ip protocols", "debug ip rip", "clear ip route *"]
                            },
                            "3-3": { 
                                title: "Routing loops", 
                                content: "Los bucles de enrutamiento son un problema crítico en protocolos vector distancia donde los paquetes circulan indefinidamente entre routers. Ocurren durante la convergencia cuando los routers tienen información inconsistente. Las técnicas de prevención incluyen: Split Horizon (no anunciar rutas por la interfaz donde se aprendieron), Poison Reverse (anunciar rutas inalcanzables con métrica infinita), y Hold-down timers (esperar antes de aceptar nuevas rutas hacia destinos que fallaron).", 
                                keyPoints: ["Circulación infinita de paquetes", "Información inconsistente durante convergencia", "Split Horizon: no anunciar por interfaz origen", "Poison Reverse: métrica infinita", "Hold-down timers: espera antes de aceptar", "Count-to-infinity problem"],
                                commands: ["debug ip rip", "show ip route", "show ip protocols"]
                            }
                        }
                    },
                    "4": {
                        title: "Configuración Vector Distancia",
                        icon: "⚙️",
                        topics: {
                            "4-1": { 
                                title: "RIPv1", 
                                content: "RIP versión 1 es un protocolo de enrutamiento classful que utiliza el conteo de saltos como única métrica, con un límite máximo de 15 saltos (16 = infinito/inalcanzable). Envía actualizaciones completas cada 30 segundos por broadcast (255.255.255.255) a todos los vecinos. Al ser classful, no incluye información de máscara de subred en las actualizaciones, asumiendo máscaras por defecto según la clase de red. Esto limita su uso en redes modernas con VLSM. Los temporizadores incluyen: Update (30s), Invalid (180s), Hold-down (180s), y Flush (240s).", 
                                keyPoints: ["Protocolo classful sin máscaras", "Métrica única: conteo de saltos", "Máximo 15 saltos (16=infinito)", "Actualizaciones broadcast cada 30s", "Temporizadores: 30/180/180/240s", "Limitado para redes modernas"], 
                                commands: ["router rip", "network 192.168.1.0", "show ip protocols", "show ip route rip", "debug ip rip"]
                            },
                            "4-2": { 
                                title: "VLSM", 
                                content: "Variable Length Subnet Mask (VLSM) permite utilizar diferentes máscaras de subred dentro de la misma red classful, optimizando significativamente el uso del espacio de direcciones IP. VLSM requiere protocolos classless que incluyan la máscara en las actualizaciones de enrutamiento. Permite diseños jerárquicos eficientes donde las subredes se dimensionan según las necesidades reales de hosts. El proceso incluye: identificar requerimientos, ordenar por tamaño descendente, asignar subredes más grandes primero, y subdividir el espacio restante.", 
                                keyPoints: ["Máscaras variables en misma red classful", "Optimización del espacio IP", "Requiere protocolos classless", "Diseño jerárquico eficiente", "Dimensionamiento según necesidades", "Proceso: ordenar, asignar, subdividir"], 
                                commands: ["show ip route", "show running-config", "ip subnet-zero"]
                            },
                            "4-3": { 
                                title: "CIDR", 
                                content: "Classless Inter-Domain Routing (CIDR) elimina las limitaciones de las clases tradicionales de direcciones IP (A, B, C), permitiendo asignaciones más flexibles y eficientes del espacio de direcciones. CIDR utiliza la notación de prefijo (/n) para indicar la longitud de la máscara de red. Facilita la agregación de rutas (route summarization) reduciendo el tamaño de las tablas de enrutamiento en Internet. Los beneficios incluyen: uso eficiente del espacio IP, reducción de tablas de enrutamiento, flexibilidad en asignaciones, y soporte para supernetting.", 
                                keyPoints: ["Eliminación de clases IP tradicionales", "Notación de prefijo /n", "Asignaciones flexibles y eficientes", "Agregación de rutas (summarization)", "Reducción de tablas de enrutamiento", "Soporte para supernetting"], 
                                commands: ["show ip route", "ip route 0.0.0.0 0.0.0.0", "show ip route summary"]
                            },
                            "4-4": { 
                                title: "RIPv2", 
                                content: "RIP versión 2 es una mejora significativa sobre RIPv1, siendo un protocolo classless que incluye la máscara de subred en las actualizaciones de enrutamiento. Utiliza multicast (224.0.0.9) en lugar de broadcast, reduciendo el tráfico de red. Soporta autenticación mediante texto plano o MD5 para mayor seguridad. Incluye campos adicionales como Route Tag para políticas de enrutamiento. Mantiene la misma métrica de saltos y límites que RIPv1, pero con capacidades modernas como VLSM y CIDR.", 
                                keyPoints: ["Protocolo classless con máscaras", "Multicast 224.0.0.9 (no broadcast)", "Autenticación texto plano/MD5", "Soporte completo VLSM/CIDR", "Route Tags para políticas", "Compatibilidad con RIPv1"], 
                                commands: ["router rip", "version 2", "network 192.168.1.0", "no auto-summary", "passive-interface default", "key chain RIP_KEY"]
                            },
                            "4-5": { 
                                title: "Solución de problemas", 
                                content: "El troubleshooting de RIP requiere un enfoque sistemático que incluye verificación de configuración básica, conectividad física, temporizadores, y propagación de rutas. Los problemas comunes incluyen: redes no anunciadas, auto-summary causando problemas, interfaces pasivas mal configuradas, y problemas de autenticación en RIPv2. Las herramientas de diagnóstico incluyen comandos show y debug, análisis de tablas de enrutamiento, y verificación de adyacencias. Es crucial entender los temporizadores RIP y cómo afectan la convergencia.", 
                                keyPoints: ["Verificación sistemática de configuración", "Problemas comunes: auto-summary, interfaces pasivas", "Herramientas: show, debug, análisis tablas", "Verificación de adyacencias RIP", "Análisis de temporizadores", "Troubleshooting de autenticación RIPv2"], 
                                commands: ["show ip route rip", "debug ip rip", "show ip protocols", "show running-config | section rip", "clear ip route *", "ping", "traceroute"]
                            }
                        }
                    },
                    "5": {
                        title: "Tabla Enrutamiento y EIGRP",
                        icon: "🗂️",
                        topics: {
                            "5-1": { 
                                title: "Estructura de la tabla", 
                                content: "La tabla de enrutamiento IP es una estructura de datos fundamental que contiene información sobre cómo alcanzar redes remotas. Cada entrada incluye: red de destino, máscara de subred, distancia administrativa, métrica, siguiente salto, interfaz de salida, y timestamp. Las entradas se organizan jerárquicamente con rutas padre (classful) y rutas hijo (subredes). Los códigos de origen indican cómo se aprendió la ruta: C (conectada), S (estática), R (RIP), D (EIGRP), O (OSPF). La tabla se consulta para cada paquete que debe ser reenviado.", 
                                keyPoints: ["Red destino y máscara de subred", "Distancia administrativa y métrica", "Siguiente salto e interfaz de salida", "Códigos de origen (C, S, R, D, O)", "Estructura jerárquica padre-hijo", "Timestamp de última actualización"], 
                                commands: ["show ip route", "show ip route detail", "show ip route summary", "show ip route connected"]
                            },
                            "5-2": { 
                                title: "Proceso de búsqueda", 
                                content: "El proceso de búsqueda en la tabla de enrutamiento utiliza el algoritmo de coincidencia más larga (longest prefix match) para determinar la mejor ruta hacia un destino. El router examina cada entrada comparando la dirección IP destino con las redes en la tabla, aplicando la máscara correspondiente. Si múltiples rutas coinciden, se selecciona la que tenga el prefijo más largo (máscara más específica). Si no hay coincidencia exacta, se utiliza la ruta por defecto (0.0.0.0/0). El proceso incluye verificación de accesibilidad de la interfaz de salida.", 
                                keyPoints: ["Longest prefix match algorithm", "Comparación IP destino con entradas", "Selección de máscara más específica", "Ruta por defecto como último recurso", "Verificación accesibilidad interfaz", "Proceso para cada paquete reenviado"], 
                                commands: ["show ip route 192.168.1.1", "show ip cef", "show adjacency", "debug ip packet"]
                            },
                            "5-3": { 
                                title: "Introducción a EIGRP", 
                                content: "Enhanced Interior Gateway Routing Protocol (EIGRP) es un protocolo de enrutamiento avanzado desarrollado por Cisco que combina las mejores características de los protocolos de vector distancia y estado de enlace. Utiliza el algoritmo DUAL (Diffusing Update Algorithm) para garantizar rutas libres de bucles y convergencia rápida. EIGRP mantiene tres tablas: tabla de vecinos, tabla topológica, y tabla de enrutamiento. Soporta múltiples protocolos de capa de red (IP, IPX, AppleTalk) y proporciona balanceo de carga desigual.", 
                                keyPoints: ["Protocolo híbrido avanzado de Cisco", "Algoritmo DUAL para convergencia rápida", "Tres tablas: vecinos, topológica, enrutamiento", "Soporte multi-protocolo", "Balanceo de carga desigual", "Libre de bucles garantizado"], 
                                commands: ["show ip eigrp neighbors", "show ip eigrp topology", "show ip protocols", "show ip eigrp interfaces"]
                            },
                            "5-4": { 
                                title: "Configuración EIGRP", 
                                content: "La configuración de EIGRP requiere especificar un número de sistema autónomo (AS) que debe ser idéntico en todos los routers del dominio EIGRP. Las redes se declaran usando el comando network con direcciones classful o con wildcard masks para mayor precisión. EIGRP por defecto realiza auto-summary en límites de redes classful, pero se recomienda deshabilitarlo con 'no auto-summary' para redes modernas. La configuración incluye ajustes de temporizadores, autenticación, y optimizaciones de ancho de banda.", 
                                keyPoints: ["Número AS idéntico en todo el dominio", "Declaración de redes con wildcard masks", "Auto-summary deshabilitado recomendado", "Configuración de temporizadores", "Autenticación MD5 disponible", "Optimizaciones de ancho de banda"], 
                                commands: ["router eigrp 100", "network 192.168.1.0 0.0.0.255", "no auto-summary", "eigrp router-id 1.1.1.1", "passive-interface default"]
                            },
                            "5-5": { 
                                title: "Métrica EIGRP", 
                                content: "EIGRP utiliza una métrica compuesta sofisticada que considera múltiples factores de la ruta: ancho de banda (bandwidth), delay, confiabilidad (reliability), carga (load), y MTU. Por defecto, solo se usan bandwidth y delay en el cálculo. La fórmula es: Métrica = [K1*Bandwidth + (K2*Bandwidth)/(256-Load) + K3*Delay] * [K5/(Reliability+K4)]. Los valores K por defecto son K1=K3=1, K2=K4=K5=0. El ancho de banda se calcula como 10^7/BW_kbps, y el delay es la suma de delays en la ruta.", 
                                keyPoints: ["Métrica compuesta multi-factor", "Bandwidth y Delay por defecto", "Fórmula con constantes K1-K5", "BW = 10^7/BW_kbps", "Delay acumulativo en la ruta", "Reliability y Load opcionales"], 
                                commands: ["show ip eigrp topology", "show interface", "bandwidth 1000", "delay 100", "metric weights 0 1 0 1 0 0"]
                            },
                            "5-6": { 
                                title: "DUAL", 
                                content: "Diffusing Update Algorithm (DUAL) es el corazón de EIGRP que garantiza rutas libres de bucles y proporciona convergencia rápida. DUAL mantiene una ruta successor (mejor ruta) y puede mantener rutas feasible successor (rutas de respaldo que cumplen la condición de factibilidad). La condición de factibilidad establece que la distancia anunciada de un vecino debe ser menor que la distancia de factibilidad actual. Cuando se pierde la ruta successor y no hay feasible successor, DUAL inicia un cálculo difuso (diffusing computation) consultando a los vecinos.", 
                                keyPoints: ["Algoritmo libre de bucles garantizado", "Successor: mejor ruta actual", "Feasible Successor: rutas de respaldo", "Condición de factibilidad", "Diffusing computation cuando es necesario", "Convergencia instantánea con FS disponible"], 
                                commands: ["show ip eigrp topology", "show ip eigrp topology all-links", "debug eigrp fsm", "show ip eigrp neighbors detail"]
                            }
                        }
                    },
                    "6": {
                        title: "Protocolo OSPF",
                        icon: "🌐",
                        topics: {
                            "6-1": { 
                                title: "Introducción OSPF", 
                                content: "Open Shortest Path First (OSPF) es un protocolo de enrutamiento de estado de enlace estándar abierto (RFC 2328) que utiliza el algoritmo Shortest Path First (SPF) de Dijkstra para calcular las mejores rutas. OSPF mantiene una base de datos topológica completa de la red (LSDB - Link State Database) que es idéntica en todos los routers del área. Cada router construye un árbol SPF con él mismo como raíz, calculando la ruta más corta hacia todos los destinos. OSPF soporta diseño jerárquico con áreas, VLSM, autenticación, y convergencia rápida.", 
                                keyPoints: ["Protocolo estado de enlace estándar", "Algoritmo SPF (Dijkstra)", "Base de datos topológica (LSDB)", "Diseño jerárquico con áreas", "Soporte completo VLSM", "Convergencia rápida"], 
                                commands: ["show ip ospf", "show ip ospf database", "show ip ospf neighbor", "show ip ospf interface"]
                            },
                            "6-2": { 
                                title: "Métricas", 
                                content: "OSPF utiliza costo como métrica, calculado por defecto como 100,000,000 dividido por el ancho de banda de la interfaz en bps. Esta fórmula de referencia puede ajustarse con el comando 'auto-cost reference-bandwidth'. El costo puede configurarse manualmente por interfaz usando 'ip ospf cost'. OSPF selecciona la ruta con menor costo acumulativo hacia el destino. En caso de rutas con igual costo, OSPF puede realizar balanceo de carga entre hasta 4 rutas por defecto (configurable hasta 16).", 
                                keyPoints: ["Métrica: costo basado en ancho de banda", "Fórmula: 100,000,000 / BW_bps", "Configurable por interfaz", "Menor costo acumulativo gana", "Balanceo de carga igual costo", "Hasta 16 rutas paralelas"], 
                                commands: ["show ip route ospf", "ip ospf cost 10", "auto-cost reference-bandwidth 10000", "show ip ospf interface"]
                            },
                            "6-3": { 
                                title: "Redes de accesos múltiples", 
                                content: "En redes de acceso múltiple como Ethernet, donde múltiples routers pueden comunicarse directamente, OSPF implementa un mecanismo de optimización eligiendo un Designated Router (DR) y un Backup Designated Router (BDR). Esto reduce significativamente el número de adyacencias necesarias de n(n-1)/2 a 2n-3, donde n es el número de routers. Todos los routers forman adyacencia completa solo con el DR y BDR, mientras que entre otros routers mantienen relaciones de vecindad en estado 2-Way.", 
                                keyPoints: ["Optimización para redes multi-acceso", "DR y BDR elegidos por segmento", "Reducción adyacencias: n(n-1)/2 a 2n-3", "Adyacencia completa solo con DR/BDR", "Estado 2-Way entre DROthers", "Multicast 224.0.0.5 y 224.0.0.6"], 
                                commands: ["show ip ospf neighbor", "show ip ospf interface", "ip ospf priority 100", "debug ip ospf adj"]
                            },
                            "6-4": { 
                                title: "DR/BDR", 
                                content: "La elección de Designated Router (DR) y Backup Designated Router (BDR) sigue un proceso específico: primero se considera la prioridad OSPF de la interfaz (0-255, default 1), donde prioridad 0 significa que el router no puede ser DR/BDR. En caso de empate en prioridad, se usa el Router ID más alto como criterio de desempate. El DR centraliza el intercambio de LSAs en el segmento, mientras el BDR monitorea al DR y toma su lugar si falla. Una vez elegidos, DR y BDR son estables hasta que fallen o se reinicie la red.", 
                                keyPoints: ["Elección por prioridad OSPF (0-255)", "Router ID como criterio de desempate", "Prioridad 0 = no elegible", "DR centraliza intercambio LSAs", "BDR monitorea y reemplaza DR", "Elección estable hasta fallo/reinicio"], 
                                commands: ["show ip ospf neighbor detail", "ip ospf priority 0", "show ip ospf interface", "clear ip ospf process"]
                            },
                            "6-5": { 
                                title: "Configuración OSPF", 
                                content: "La configuración básica de OSPF requiere un Process ID (localmente significativo, 1-65535) y la declaración de redes usando wildcard masks junto con el área correspondiente. El área 0 es el área backbone obligatoria en diseños multi-área. Es recomendable configurar manualmente el Router ID usando 'router-id' para evitar cambios automáticos. Las interfaces pueden configurarse como pasivas para evitar formar adyacencias innecesarias. La autenticación puede implementarse por área o por interfaz para mayor seguridad.", 
                                keyPoints: ["Process ID localmente significativo", "Declaración con wildcard masks", "Área 0 = backbone obligatorio", "Router ID manual recomendado", "Interfaces pasivas para seguridad", "Autenticación por área/interfaz"], 
                                commands: ["router ospf 1", "router-id 1.1.1.1", "network 192.168.1.0 0.0.0.255 area 0", "passive-interface default", "area 0 authentication message-digest"]
                            }
                        }
                    }
                }
            },
            emergent: {
                title: "Redes Emergentes",
                modules: {
                    "7": {
                        title: "Fundamentos de Redes Emergentes",
                        icon: "🚀",
                        topics: {
                            "7-1": {
                                title: "Antecedentes e impacto en la vida moderna",
                                content: "Las redes emergentes representan tecnologías disruptivas que están transformando fundamentalmente la forma en que nos comunicamos, trabajamos y vivimos. Estas incluyen Internet de las Cosas (IoT), redes definidas por software (SDN), computación en la nube, edge computing, inteligencia artificial aplicada a redes, y tecnologías de virtualización. Su impacto se extiende desde la automatización industrial hasta ciudades inteligentes, telemedicina, vehículos autónomos, y realidad aumentada. La convergencia de estas tecnologías está creando nuevos paradigmas de conectividad que requieren arquitecturas de red más flexibles, escalables y adaptativas.",
                                keyPoints: ["Tecnologías disruptivas: IoT, SDN, Cloud, Edge", "Transformación digital de industrias", "Ciudades inteligentes y automatización", "Convergencia tecnológica", "Arquitecturas adaptativas", "Nuevos paradigmas de conectividad"],
                                technologies: ["Internet de las Cosas (IoT)", "Redes Definidas por Software (SDN)", "Network Function Virtualization (NFV)", "Edge Computing", "5G y Beyond", "Inteligencia Artificial en Redes"]
                            },
                            "7-2": {
                                title: "Tecnologías de clientes ligeros",
                                content: "Los clientes ligeros (thin clients) son dispositivos computacionales que dependen principalmente de un servidor central para el procesamiento y almacenamiento de datos. Esta arquitectura centralizada ofrece ventajas significativas en términos de gestión, seguridad y costos. Los clientes ligeros típicamente ejecutan un sistema operativo mínimo, suficiente para establecer conexión de red y ejecutar un cliente de escritorio remoto. Las tecnologías incluyen VDI (Virtual Desktop Infrastructure), terminal services, y soluciones basadas en navegador. Son ideales para entornos corporativos, educativos, y call centers donde se requiere gestión centralizada y alta seguridad.",
                                specifications: ["CPU de bajo consumo (ARM/x86 básico)", "RAM mínima (2-4 GB)", "Almacenamiento flash (8-32 GB)", "Conectividad de red obligatoria", "Interfaces I/O estándar", "Arranque por red (PXE/TFTP)"],
                                keyPoints: ["Procesamiento centralizado en servidor", "Gestión y mantenimiento simplificados", "Mayor seguridad de datos", "Menor costo total de propiedad (TCO)", "Eficiencia energética", "Escalabilidad empresarial"],
                                technologies: ["VDI (Virtual Desktop Infrastructure)", "Terminal Services / RDS", "Citrix XenApp/XenDesktop", "VMware Horizon", "Browser-based computing", "Cloud workspaces"]
                            },
                            "7-3": {
                                title: "Tecnología inalámbrica y sistemas asociados",
                                content: "Las tecnologías inalámbricas han revolucionado las comunicaciones modernas, eliminando las limitaciones físicas de los cables y permitiendo movilidad total. Estas tecnologías utilizan el espectro electromagnético para transmitir información a través de ondas de radio, microondas, infrarrojos, y luz visible. Los sistemas incluyen desde comunicaciones de corto alcance como Bluetooth y NFC, hasta redes de área amplia como celulares y satelitales. La evolución continua incluye WiFi 6/6E, 5G, comunicaciones por luz visible (LiFi), y redes mesh inteligentes. Cada tecnología tiene características específicas de alcance, velocidad, consumo energético y casos de uso.",
                                technologies: ["WiFi 6/6E (802.11ax)", "Bluetooth 5.x y LE", "5G NR (New Radio)", "LoRaWAN e IoT LPWAN", "NFC (Near Field Communication)", "Comunicaciones satelitales", "LiFi (Light Fidelity)", "Zigbee y Z-Wave"],
                                keyPoints: ["Comunicación sin restricciones físicas", "Movilidad y flexibilidad total", "Espectro electromagnético regulado", "Diferentes alcances y velocidades", "Optimización energética", "Convergencia de tecnologías"],
                                applications: ["Redes corporativas inalámbricas", "IoT y sensores distribuidos", "Comunicaciones móviles", "Sistemas de automatización", "Entretenimiento y multimedia", "Aplicaciones industriales"]
                            }
                        }
                    },
                    "8": {
                        title: "Redes VLAN",
                        icon: "🌐",
                        topics: {
                            "8-1": {
                                title: "Tipos VLAN",
                                content: "Las VLANs (Virtual Local Area Networks) permiten segmentar lógicamente una red física en múltiples dominios de broadcast independientes. Los tipos principales incluyen: VLAN por puerto (Port-based) donde los puertos se asignan estáticamente a VLANs específicas; VLAN por protocolo (Protocol-based) que agrupa tráfico según el protocolo de capa 3; VLAN por MAC (MAC-based) que clasifica según direcciones MAC; y VLAN por subred (Subnet-based) que segmenta por rangos IP. Las VLANs proporcionan beneficios como mejor seguridad, gestión simplificada, reducción de tráfico broadcast, y flexibilidad en el diseño de red sin cambios físicos.",
                                types: ["Port-based VLAN (estática)", "Protocol-based VLAN (dinámica)", "MAC-based VLAN (dinámica)", "Subnet-based VLAN (por IP)", "Voice VLAN (auxiliar)", "Management VLAN (administración)"],
                                keyPoints: ["Segmentación lógica sin cambios físicos", "Dominios de broadcast independientes", "Mejor seguridad y aislamiento", "Gestión centralizada eficiente", "Reducción significativa de tráfico", "Flexibilidad en diseño de red"],
                                commands: ["vlan 10", "name Sales", "interface fastethernet 0/1", "switchport mode access", "switchport access vlan 10"]
                            },
                            "8-2": { 
                                title: "Protocolos de enlace VLAN", 
                                content: "Los protocolos de enlace VLAN facilitan la gestión y transporte de tráfico VLAN entre switches. IEEE 802.1Q es el estándar abierto que agrega un tag de 4 bytes al frame Ethernet, incluyendo VLAN ID (12 bits) y prioridad (3 bits). ISL (Inter-Switch Link) es el protocolo propietario de Cisco que encapsula completamente el frame original. DTP (Dynamic Trunking Protocol) negocia automáticamente el modo de trunking entre switches. VTP (VLAN Trunking Protocol) sincroniza la información de VLANs entre switches del mismo dominio, propagando cambios automáticamente.", 
                                keyPoints: ["802.1Q: estándar abierto con tagging", "ISL: encapsulación propietaria Cisco", "DTP: negociación automática trunking", "VTP: sincronización de VLANs", "Tag de 4 bytes en 802.1Q", "Propagación automática de cambios"],
                                commands: ["switchport trunk encapsulation dot1q", "switchport mode trunk", "switchport trunk allowed vlan 10,20,30", "vtp domain COMPANY", "vtp mode server"]
                            },
                            "8-3": {
                                title: "Enrutamiento inter-VLAN",
                                content: "El enrutamiento inter-VLAN permite la comunicación entre diferentes VLANs, ya que por defecto están aisladas. Los métodos incluyen: Router externo con múltiples interfaces físicas (una por VLAN); Router-on-a-stick usando subinterfaces virtuales en una sola conexión física; y Switch multicapa (Layer 3) que combina funciones de switching y routing. El método router-on-a-stick es más común en redes pequeñas/medianas, mientras switches L3 son preferidos en redes empresariales por su rendimiento superior. Cada método requiere configuración específica de VLANs, trunking, y enrutamiento.",
                                methods: ["Router externo (múltiples interfaces)", "Router-on-a-stick (subinterfaces)", "Switch multicapa (SVI)", "Subinterfaces virtuales 802.1Q", "Routing entre SVIs", "Distribución de gateway por VLAN"],
                                keyPoints: ["VLANs aisladas por defecto", "Router externo: una interfaz por VLAN", "Router-on-a-stick: subinterfaces 802.1Q", "Switch L3: mejor rendimiento", "SVI (Switch Virtual Interface)", "Gateway distribuido por VLAN"],
                                commands: ["interface fastethernet 0/0.10", "encapsulation dot1Q 10", "ip address 192.168.10.1 255.255.255.0", "interface vlan 10", "ip routing"]
                            },
                            "8-4": { 
                                title: "Resolución de problemas de VLAN", 
                                content: "El troubleshooting de VLANs requiere un enfoque sistemático que incluye verificación de configuración VLAN, estado de puertos, configuración de trunking, y conectividad inter-VLAN. Los problemas comunes incluyen: VLANs no creadas o mal configuradas, puertos en VLAN incorrecta, problemas de trunking (allowed VLANs, native VLAN mismatch), y configuración incorrecta de enrutamiento inter-VLAN. Las herramientas incluyen comandos show para verificar estado, debug para análizar tráfico, y ping/traceroute para probar conectividad. Es crucial verificar la consistencia de configuración entre switches.", 
                                keyPoints: ["Verificación sistemática de configuración", "Problemas comunes: VLAN incorrecta, trunking", "Native VLAN mismatch", "Herramientas: show, debug, ping", "Consistencia entre switches", "Análisis de spanning-tree por VLAN"],
                                commands: ["show vlan brief", "show interfaces trunk", "show spanning-tree vlan 10", "debug sw-vlan vtp", "show vtp status"]
                            },
                            "8-5": { 
                                title: "Seguridad en VLAN", 
                                content: "La seguridad en VLANs abarca múltiples aspectos críticos. Private VLANs proporcionan aislamiento adicional dentro de una VLAN mediante primary, isolated, y community VLANs. VLAN hopping es un ataque donde el atacante accede a VLANs no autorizadas mediante double tagging o switch spoofing. Las mejores prácticas incluyen: cambiar VLAN nativa por defecto, deshabilitar DTP en puertos de acceso, usar VLANs dedicadas para gestión, implementar port security, y configurar private VLANs donde sea necesario. La segmentación adecuada y políticas de acceso son fundamentales.", 
                                keyPoints: ["Private VLANs: primary, isolated, community", "VLAN hopping: double tagging, switch spoofing", "Cambiar VLAN nativa por defecto", "Deshabilitar DTP en acceso", "VLANs dedicadas para gestión", "Port security y políticas de acceso"],
                                commands: ["switchport nonegotiate", "vlan 999", "name NATIVE_UNUSED", "switchport trunk native vlan 999", "private-vlan primary", "switchport port-security"]
                            }
                        }
                    },
                    "9": {
                        title: "Redes Móviles",
                        icon: "📱",
                        topics: {
                            "9-1": { 
                                title: "Contexto general de las comunicaciones móviles", 
                                content: "Las comunicaciones móviles han experimentado una evolución revolucionaria desde los primeros sistemas analógicos (1G) en los años 80 hasta las redes 5G actuales. Esta evolución ha transformado fundamentalmente la sociedad, habilitando la era de la información móvil, el comercio electrónico, las redes sociales, y el Internet de las Cosas. Los hitos incluyen: introducción de GSM (2G) con comunicaciones digitales, GPRS/EDGE (2.5G) con datos por paquetes, UMTS/HSPA (3G) con banda ancha móvil, LTE (4G) con IP nativo, y 5G con ultra-baja latencia y conectividad masiva. Cada generación ha multiplicado las capacidades anteriores en velocidad, capacidad, y eficiencia espectral.", 
                                keyPoints: ["Evolución desde 1G analógico hasta 5G", "Transformación social y económica", "Hitos tecnológicos por generación", "Multiplicación de capacidades", "Habilitador de nuevos servicios", "Convergencia con Internet"],
                                milestones: ["1G (1980s): Comunicaciones analógicas", "2G (1990s): Digital, SMS, GSM", "3G (2000s): Banda ancha móvil, video", "4G (2010s): IP nativo, LTE", "5G (2020s): Ultra-baja latencia, IoT masivo"]
                            },
                            "9-2": { 
                                title: "Redes móviles en la sociedad de la información", 
                                content: "Las redes móviles son el pilar fundamental de la sociedad de la información moderna, proporcionando conectividad ubicua que ha transformado cómo trabajamos, nos comunicamos, y accedemos a servicios. Han democratizado el acceso a Internet, especialmente en países en desarrollo donde la infraestructura móvil llegó antes que la fija. Las redes móviles habilitan aplicaciones críticas como telemedicina, educación a distancia, banca móvil, comercio electrónico, y servicios gubernamentales digitales. La convergencia con tecnologías como IoT, inteligencia artificial, y computación en la nube está creando nuevos paradigmas de servicios inteligentes y ciudades conectadas.", 
                                keyPoints: ["Pilar de la sociedad de información", "Democratización acceso Internet", "Habilitador de servicios críticos", "Transformación digital global", "Convergencia con IA e IoT", "Ciudades inteligentes conectadas"],
                                applications: ["Telemedicina y salud digital", "Educación a distancia", "Banca y pagos móviles", "Comercio electrónico", "Servicios gubernamentales", "Entretenimiento y medios"]
                            },
                            "9-3": {
                                title: "Espectro, estandarización y regularización",
                                content: "La gestión del espectro radioeléctrico es fundamental para las comunicaciones móviles, siendo un recurso escaso que requiere coordinación internacional. Los organismos como ITU-R definen bandas de frecuencia globales, mientras que cada país asigna licencias específicas. La evolución generacional ha requerido nuevas bandas: 2G utilizó principalmente 900/1800 MHz, 3G agregó 2100 MHz, 4G expandió a múltiples bandas incluyendo 700/800/1800/2600 MHz, y 5G introduce bandas milimétricas (24-100 GHz) además de reutilizar bandas existentes. La estandarización global por 3GPP asegura interoperabilidad, mientras que la regulación nacional gestiona interferencias y competencia.",
                                generations: {
                                    "2G": ["GSM (900/1800 MHz)", "IS-95 CDMA (800/1900 MHz)", "IS-136 TDMA"],
                                    "2.5G": ["GPRS (datos por paquetes)", "EDGE (Enhanced Data rates)", "CDMA2000-1x"],
                                    "3G": ["UMTS/WCDMA (2100 MHz)", "CDMA2000-1xEV-DO", "HSPA/HSPA+ (hasta 42 Mbps)"],
                                    "4G": ["LTE (múltiples bandas)", "LTE-Advanced (1 Gbps)", "WiMAX (IEEE 802.16)"],
                                    "5G": ["5G NR (Sub-6 GHz)", "mmWave (24-100 GHz)", "Massive MIMO", "Network Slicing"]
                                },
                                keyPoints: ["Espectro: recurso escaso regulado", "Coordinación internacional ITU-R", "Evolución hacia bandas milimétricas", "Estandarización global 3GPP", "Regulación nacional de licencias", "Reutilización y agregación espectral"]
                            },
                            "9-4": { 
                                title: "Tecnología, servicios y aplicaciones", 
                                content: "Las redes móviles modernas soportan un ecosistema diverso de aplicaciones y servicios que van desde comunicaciones básicas hasta aplicaciones críticas de misión. Los servicios incluyen: comunicaciones de voz y video en tiempo real, aplicaciones de datos intensivos como streaming de video 4K/8K, realidad aumentada/virtual, gaming en la nube, y aplicaciones IoT masivas. Las tecnologías habilitadoras incluyen edge computing para reducir latencia, network slicing para servicios diferenciados, massive MIMO para mayor capacidad, y beamforming para cobertura dirigida. Las aplicaciones emergentes como vehículos autónomos, cirugía remota, y industria 4.0 requieren características específicas de ultra-baja latencia y alta confiabilidad.", 
                                keyPoints: ["Ecosistema diverso de aplicaciones", "Servicios críticos de misión", "Edge computing y baja latencia", "Network slicing diferenciado", "Massive MIMO y beamforming", "Aplicaciones emergentes exigentes"],
                                services: ["Comunicaciones voz/video HD", "Streaming multimedia 4K/8K", "Realidad aumentada/virtual", "Gaming en la nube", "IoT masivo y sensores", "Aplicaciones industriales críticas"]
                            },
                            "9-5": { 
                                title: "Integración de redes heterogéneas", 
                                content: "La integración de redes heterogéneas (HetNets) es fundamental en el ecosistema móvil moderno, combinando macroceldas, microceldas, picoceldas, femtoceldas, y WiFi en una arquitectura unificada. Esta integración requiere gestión inteligente de handovers entre diferentes tecnologías (2G/3G/4G/5G/WiFi), balanceo de carga dinámico, y optimización de recursos. Los desafíos incluyen interferencia entre celdas, gestión de movilidad seamless, y coordinación de recursos de radio. Las soluciones incluyen SON (Self-Organizing Networks), algoritmos de handover inteligentes, y técnicas de coordinación inter-celda como CoMP (Coordinated Multi-Point).", 
                                keyPoints: ["HetNets: macro/micro/pico/femtoceldas", "Handover inter-tecnología seamless", "Balanceo de carga dinámico", "Gestión de interferencia", "SON (Self-Organizing Networks)", "CoMP (Coordinated Multi-Point)"],
                                technologies: ["Macroceldas (cobertura amplia)", "Microceldas (áreas urbanas)", "Picoceldas (hotspots)", "Femtoceldas (interiores)", "WiFi offloading", "Satellite backhaul"]
                            },
                            "9-6": { 
                                title: "Servicios personalizados", 
                                content: "Los servicios personalizados en redes móviles utilizan inteligencia artificial, análisis de big data, y context awareness para adaptar la experiencia del usuario según ubicación, preferencias, historial de uso, y condiciones de red. Esto incluye optimización dinámica de QoS, recomendaciones de contenido, servicios basados en localización, y adaptación de interfaces. Las tecnologías habilitadoras incluyen machine learning para predicción de comportamiento, edge computing para procesamiento local, y APIs abiertas para integración de servicios de terceros. La personalización debe balancear experiencia de usuario mejorada con privacidad y protección de datos personales.", 
                                keyPoints: ["IA y análisis de big data", "Context awareness y ubicación", "Optimización dinámica de QoS", "Machine learning predictivo", "Edge computing local", "Balance experiencia-privacidad"],
                                features: ["Recomendaciones inteligentes", "Servicios basados en ubicación", "Adaptación de interfaz", "QoS personalizado", "Contenido contextual", "Predicción de necesidades"]
                            },
                            "9-7": { 
                                title: "Seguridad en dispositivos móviles", 
                                content: "La seguridad móvil abarca múltiples capas desde el dispositivo hasta la red y aplicaciones. Las amenazas incluyen malware móvil, ataques man-in-the-middle, phishing, robo de identidad, y vulnerabilidades de aplicaciones. Las contramedidas incluyen autenticación multifactor, cifrado end-to-end, VPNs móviles, sandboxing de aplicaciones, y Mobile Device Management (MDM). Los estándares de seguridad incluyen 3GPP security architecture, certificación Common Criteria, y frameworks como NIST Cybersecurity. La seguridad 5G introduce nuevos desafíos con network slicing, edge computing, y IoT masivo, requiriendo zero-trust architecture y security by design.", 
                                keyPoints: ["Seguridad multicapa: dispositivo-red-app", "Amenazas: malware, phishing, MitM", "Autenticación multifactor", "Cifrado end-to-end", "MDM y gestión empresarial", "Zero-trust architecture 5G"],
                                threats: ["Malware y ransomware móvil", "Ataques man-in-the-middle", "Phishing y social engineering", "Robo de identidad", "Vulnerabilidades de apps", "Ataques a infraestructura"],
                                countermeasures: ["Autenticación biométrica", "Cifrado AES-256", "VPN empresarial", "App sandboxing", "MDM/EMM solutions", "Threat intelligence"]
                            }
                        }
                    },
                    "10": {
                        title: "Redes Inalámbricas",
                        icon: "📡",
                        topics: {
                            "10-1": { 
                                title: "Introducción a redes inalámbricas", 
                                content: "Las redes inalámbricas utilizan ondas electromagnéticas para transmitir información sin necesidad de cables físicos, operando principalmente en las bandas ISM (Industrial, Scientific, Medical) de 2.4 GHz, 5 GHz, y 6 GHz. Los principios fundamentales incluyen propagación de RF, modulación de señales, control de acceso al medio, y gestión de interferencias. Las topologías incluyen infraestructura (con Access Points), ad-hoc (peer-to-peer), mesh (malla auto-organizativa), y híbridas. Las ventajas incluyen movilidad, flexibilidad de instalación, y escalabilidad, mientras que las desventajas comprenden vulnerabilidades de seguridad, interferencias, y limitaciones de ancho de banda compartido.", 
                                keyPoints: ["Ondas electromagnéticas en bandas ISM", "Propagación RF y modulación", "Topologías: infraestructura, ad-hoc, mesh", "Movilidad y flexibilidad", "Vulnerabilidades de seguridad", "Ancho de banda compartido"],
                                principles: ["Propagación en espacio libre", "Atenuación por distancia", "Interferencia multitrayecto", "Control de acceso CSMA/CA", "Modulación OFDM", "Gestión de potencia"]
                            },
                            "10-2": {
                                title: "Estándares de redes inalámbricas",
                                content: "La familia IEEE 802.11 ha evolucionado significativamente desde 1997, incrementando velocidades, mejorando eficiencia espectral, y agregando nuevas características. WiFi 6 (802.11ax) introduce OFDMA para múltiples usuarios simultáneos, Target Wake Time para eficiencia energética, y 1024-QAM para mayor throughput. WiFi 6E extiende operación a la banda de 6 GHz con 1200 MHz de espectro adicional. Las mejoras incluyen mejor rendimiento en entornos densos, menor latencia, y soporte para aplicaciones IoT masivas. Cada generación mantiene compatibilidad hacia atrás mientras introduce nuevas capacidades.",
                                standards: {
                                    "802.11a": { frequency: "5 GHz", speed: "54 Mbps", year: "1999", features: "OFDM, 52 subportadoras" },
                                    "802.11b": { frequency: "2.4 GHz", speed: "11 Mbps", year: "1999", features: "DSSS, compatibilidad" },
                                    "802.11g": { frequency: "2.4 GHz", speed: "54 Mbps", year: "2003", features: "OFDM en 2.4 GHz" },
                                    "802.11n": { frequency: "2.4/5 GHz", speed: "600 Mbps", year: "2009", features: "MIMO 4x4, 40 MHz" },
                                    "802.11ac": { frequency: "5 GHz", speed: "6.9 Gbps", year: "2013", features: "MU-MIMO, 160 MHz, 256-QAM" },
                                    "802.11ax": { frequency: "2.4/5/6 GHz", speed: "10+ Gbps", year: "2019", features: "OFDMA, 1024-QAM, BSS Coloring" }
                                },
                                keyPoints: ["Evolución desde 1997 hasta WiFi 6E", "OFDMA para múltiples usuarios", "Eficiencia en entornos densos", "Compatibilidad hacia atrás", "Banda 6 GHz en WiFi 6E", "IoT y aplicaciones emergentes"]
                            },
                            "10-3": {
                                title: "Seguridad inalámbrica",
                                content: "La seguridad inalámbrica ha evolucionado desde WEP vulnerable hasta WPA3 robusto. WEP utilizaba cifrado RC4 con claves estáticas fácilmente comprometibles. WPA introdujo TKIP con rotación de claves dinámicas. WPA2 implementó AES-CCMP proporcionando seguridad empresarial robusta. WPA3 agrega SAE (Simultaneous Authentication of Equals) resistente a ataques de diccionario, Enhanced Open para redes públicas, y cifrado individualizado. La autenticación empresarial utiliza 802.1X con servidores RADIUS, mientras que las amenazas incluyen evil twins, deauth attacks, y WPS vulnerabilities.",
                                security: ["WEP: RC4, claves estáticas (vulnerable)", "WPA: TKIP, rotación claves", "WPA2: AES-CCMP, seguridad robusta", "WPA3: SAE, Enhanced Open", "Enterprise: 802.1X/RADIUS", "Amenazas: Evil twins, deauth"],
                                keyPoints: ["Evolución WEP → WPA → WPA2 → WPA3", "AES-CCMP cifrado robusto", "SAE resistente a diccionario", "802.1X autenticación empresarial", "Enhanced Open para redes públicas", "Mitigación de amenazas comunes"],
                                threats: ["Evil twin access points", "Deauthentication attacks", "WPS PIN brute force", "Man-in-the-middle", "Rogue access points", "Packet sniffing"]
                            },
                            "10-4": { 
                                title: "Componentes de una red inalámbrica", 
                                content: "Una red inalámbrica empresarial comprende múltiples componentes interconectados. Los Access Points proporcionan conectividad inalámbrica y pueden ser autónomos o controlados centralmente. Los controladores WLAN (WLC) gestionan múltiples APs, proporcionando configuración centralizada, roaming seamless, y políticas de seguridad. Las antenas determinan patrones de cobertura y pueden ser omnidireccionales, direccionales, o sectoriales. Los clientes incluyen dispositivos diversos con diferentes capacidades 802.11. La infraestructura de soporte incluye switches PoE, servidores RADIUS, y sistemas de gestión de red.", 
                                keyPoints: ["APs autónomos vs controlados", "WLC para gestión centralizada", "Tipos de antenas y cobertura", "Diversidad de clientes WiFi", "Infraestructura PoE y RADIUS", "Sistemas de gestión integrados"],
                                components: ["Access Points (autónomos/controlados)", "Wireless LAN Controllers (WLC)", "Antenas (omni/direccional/sectorial)", "Clientes WiFi diversos", "Switches PoE", "Servidores RADIUS/AAA", "Sistemas de gestión WLAN"]
                            },
                            "10-5": { 
                                title: "Configuración de acceso a una red inalámbrica", 
                                content: "La configuración de redes inalámbricas requiere planificación cuidadosa de cobertura, capacidad, y seguridad. El site survey determina ubicaciones óptimas de APs considerando obstáculos, interferencias, y requisitos de capacidad. La configuración incluye SSIDs múltiples para diferentes grupos de usuarios, VLANs para segmentación, y políticas de QoS para priorizar tráfico crítico. El roaming seamless requiere configuración de controladores, fast transition (802.11r), y optimización de handoffs. La gestión incluye monitoreo de rendimiento, detección de interferencias, y actualizaciones de firmware.", 
                                keyPoints: ["Site survey para planificación", "SSIDs múltiples y VLANs", "Políticas QoS diferenciadas", "Roaming seamless 802.11r", "Monitoreo y optimización", "Gestión centralizada"],
                                configuration: ["Site survey y heat maps", "SSID y VLAN mapping", "Políticas de seguridad", "QoS y traffic shaping", "Fast roaming (802.11r/k/v)", "Monitoreo de interferencias", "Gestión de firmware"]
                            }
                        }
                    },
                    "11": {
                        title: "Red VoIP",
                        icon: "☎️",
                        topics: {
                            "11-1": {
                                title: "Introducción a la telefonía IP",
                                content: "Voice over IP (VoIP) revoluciona las comunicaciones al convertir señales de voz analógicas en paquetes digitales que se transmiten sobre redes IP. Esta tecnología ofrece ventajas significativas: reducción drástica de costos (especialmente en llamadas de larga distancia), convergencia de servicios de voz y datos en una sola infraestructura, flexibilidad para agregar nuevas funcionalidades, y escalabilidad mejorada. Los componentes principales incluyen terminales VoIP (softphones, teléfonos IP), gateways para interconexión con PSTN, gatekeepers para gestión de llamadas, MCUs para conferencias multipunto, y proxy servers para enrutamiento de señalización.",
                                components: ["Terminales VoIP (softphones, IP phones)", "Gateways PSTN/VoIP", "Gatekeepers H.323", "MCU (Multipoint Control Unit)", "Proxy/Registrar Servers SIP", "Media Gateways"],
                                keyPoints: ["Conversión voz analógica a paquetes IP", "Reducción significativa de costos", "Convergencia voz-datos unificada", "Flexibilidad y nuevas funcionalidades", "Escalabilidad mejorada", "Integración con aplicaciones"]
                            },
                            "11-2": { 
                                title: "La evolución tecnológica", 
                                content: "La evolución de la telefonía ha progresado desde sistemas analógicos tradicionales (PSTN) hacia redes completamente digitales basadas en IP. Esta transición incluye etapas intermedias como ISDN (digital sobre circuitos), sistemas híbridos TDM/IP, y finalmente NGN (Next Generation Networks) totalmente basadas en IP. Los drivers incluyen reducción de costos operativos, demanda de servicios convergentes, necesidad de movilidad, y presión competitiva. La migración requiere consideraciones de calidad de servicio, interoperabilidad con sistemas legacy, capacitación de personal, y gestión del cambio organizacional.", 
                                keyPoints: ["PSTN analógico → ISDN → TDM → IP", "NGN (Next Generation Networks)", "Drivers: costos, convergencia, movilidad", "Desafíos: QoS, interoperabilidad", "Gestión del cambio organizacional", "Coexistencia sistemas híbridos"]
                            },
                            "11-3": {
                                title: "Digitalización de la voz",
                                content: "La digitalización de voz sigue el proceso fundamental de muestreo (8 kHz según Nyquist para voz), cuantización (conversión a valores discretos), y codificación (compresión digital). Los códecs balancean calidad de voz, ancho de banda requerido, y latencia introducida. G.711 (PCM) ofrece calidad excelente sin compresión a 64 kbps. G.729 proporciona buena calidad con compresión significativa a 8 kbps. G.723.1 maximiza compresión a 5.3/6.3 kbps con calidad aceptable pero mayor latencia. La selección de códec depende del ancho de banda disponible, calidad requerida, y capacidad de procesamiento.",
                                codecs: {
                                    "G.711": { bitrate: "64 kbps", quality: "Excelente (MOS 4.1)", delay: "Bajo (0.75ms)", compression: "Sin compresión (PCM)" },
                                    "G.729": { bitrate: "8 kbps", quality: "Buena (MOS 3.9)", delay: "Medio (15ms)", compression: "CS-ACELP" },
                                    "G.723.1": { bitrate: "5.3/6.3 kbps", quality: "Aceptable (MOS 3.6)", delay: "Alto (30ms)", compression: "ACELP/MP-MLQ" },
                                    "G.722": { bitrate: "64 kbps", quality: "HD (MOS 4.2)", delay: "Bajo (4ms)", compression: "Wideband 7kHz" }
                                },
                                keyPoints: ["Muestreo 8 kHz (Nyquist)", "Cuantización y codificación", "Trade-off calidad/ancho de banda", "MOS (Mean Opinion Score)", "Latencia de codificación", "Selección según requisitos"]
                            },
                            "11-4": { 
                                title: "Transporte de voz en tiempo real", 
                                content: "El transporte de media en tiempo real utiliza RTP (Real-time Transport Protocol) para entregar audio/video con timestamps y números de secuencia, mientras RTCP (RTP Control Protocol) proporciona feedback de calidad y control de sesión. Los desafíos incluyen jitter (variación de delay), pérdida de paquetes, y delay total. Los jitter buffers adaptativos compensan variaciones de red, mientras que técnicas como FEC (Forward Error Correction) y retransmisión selectiva mitigan pérdidas. QoS es crítico, requiriendo priorización de tráfico, reserva de ancho de banda, y gestión de congestión.", 
                                keyPoints: ["RTP: timestamps y secuenciación", "RTCP: feedback y control calidad", "Jitter buffers adaptativos", "FEC y recuperación de errores", "QoS crítico para tiempo real", "Gestión de congestión"],
                                requirements: ["Latencia < 150ms (recomendado)", "Jitter < 30ms", "Pérdida paquetes < 1%", "Ancho de banda garantizado", "Priorización QoS", "Redundancia de rutas"]
                            },
                            "11-5": {
                                title: "Estándares de comunicación de VoIP",
                                content: "Los estándares VoIP principales incluyen H.323 (ITU-T) como suite completa para multimedia, SIP (IETF) como protocolo simple y extensible, MGCP/H.248 para control de gateways, y RTP/RTCP para transporte de media. H.323 proporciona un framework completo pero complejo, mientras SIP ofrece simplicidad y flexibilidad para aplicaciones web. MGCP centraliza inteligencia en controladores de llamadas, y H.248/Megaco evoluciona MGCP para mayor escalabilidad. La interoperabilidad entre estándares requiere gateways de protocolo y normalización de códecs.",
                                protocols: {
                                    "H.323": "Suite ITU-T completa: H.225, H.245, RAS",
                                    "SIP": "Protocolo IETF simple, basado en HTTP",
                                    "MGCP": "Control centralizado de gateways",
                                    "H.248/Megaco": "Evolución de MGCP, más escalable",
                                    "RTP/RTCP": "Transporte tiempo real y control",
                                    "ENUM": "Mapeo E.164 a URIs SIP"
                                },
                                keyPoints: ["H.323: completo pero complejo", "SIP: simple y extensible", "MGCP/H.248: control centralizado", "RTP/RTCP: transporte universal", "Interoperabilidad entre estándares", "Evolución hacia SIP dominante"]
                            },
                            "11-6": { 
                                title: "Esquema de transmisión", 
                                content: "Las arquitecturas VoIP varían desde peer-to-peer simples hasta sistemas empresariales complejos con múltiples componentes. Las topologías incluyen: arquitectura centralizada con PBX IP, distribuida con múltiples sitios interconectados, híbrida combinando TDM y IP, y cloud-based con servicios hospedados. El call flow típico incluye registro de usuarios, establecimiento de sesión (señalización), negociación de capacidades (códecs), establecimiento de media path (RTP), y terminación de llamada. La arquitectura debe considerar redundancia, escalabilidad, QoS end-to-end, y integración con sistemas existentes.", 
                                keyPoints: ["Topologías: centralizada, distribuida, híbrida", "Call flow: registro, señalización, media", "PBX IP vs sistemas cloud", "Redundancia y alta disponibilidad", "QoS end-to-end", "Integración con sistemas legacy"],
                                architectures: ["PBX IP centralizada", "Arquitectura distribuida multi-sitio", "Sistemas híbridos TDM/IP", "Cloud/hosted VoIP", "SBC (Session Border Controllers)", "Federación de dominios"]
                            },
                            "11-7": { 
                                title: "Interconexión con otras redes", 
                                content: "La interconexión VoIP con redes existentes requiere gateways especializados para traducir entre diferentes protocolos y formatos. Los Media Gateways convierten entre TDM y IP, mientras Signaling Gateways traducen protocolos de señalización (SS7 ↔ SIP/H.323). Los Session Border Controllers (SBC) proporcionan seguridad, NAT traversal, y interoperabilidad entre dominios. La integración incluye PSTN para llamadas externas, sistemas PBX legacy, redes móviles, y otros proveedores VoIP. Los desafíos incluyen mapeo de números (ENUM), calidad de servicio extremo a extremo, y facturación inter-carrier.", 
                                keyPoints: ["Media Gateways: TDM ↔ IP", "Signaling Gateways: SS7 ↔ SIP", "SBC: seguridad e interoperabilidad", "Integración PSTN y PBX legacy", "ENUM para mapeo de números", "Facturación inter-carrier"],
                                components: ["Media Gateway (MGW)", "Signaling Gateway (SGW)", "Session Border Controller (SBC)", "ENUM servers", "Billing/mediation systems", "Network management"]
                            },
                            "11-8": { 
                                title: "Seguridad en redes de VoIP", 
                                content: "La seguridad VoIP enfrenta amenazas únicas debido a la naturaleza de tiempo real y la convergencia con redes de datos. Las amenazas incluyen eavesdropping (escucha no autorizada), toll fraud (fraude de llamadas), DoS attacks, SPIT (spam over IP telephony), y man-in-the-middle attacks. Las contramedidas incluyen cifrado de señalización (TLS) y media (SRTP), autenticación robusta, firewalls especializados para VoIP, IDS/IPS adaptados, y Session Border Controllers con funciones de seguridad. La implementación requiere balance entre seguridad y calidad de servicio, considerando que el cifrado puede introducir latencia adicional.", 
                                keyPoints: ["Amenazas: eavesdropping, toll fraud, DoS", "Cifrado: TLS señalización, SRTP media", "Autenticación robusta requerida", "Firewalls especializados VoIP", "SBC con funciones seguridad", "Balance seguridad vs QoS"],
                                threats: ["Eavesdropping y wiretapping", "Toll fraud y theft of service", "DoS/DDoS attacks", "SPIT (Spam over IP Telephony)", "Man-in-the-middle attacks", "Vishing (voice phishing)"],
                                countermeasures: ["TLS para señalización", "SRTP para cifrado media", "Autenticación digest/certificados", "VoIP-aware firewalls", "IDS/IPS especializados", "SBC con security features"]
                            }
                        }
                    }
                }
            }
        };

        // Quiz data for both tracks
        this.quizData = {
            traditional: {
                "1": {
                    title: "Quiz - Introducción al Enrutamiento",
                    questions: [
                        { question: "¿En qué capa del modelo OSI operan los routers?", options: ["Capa 1 - Física", "Capa 2 - Enlace", "Capa 3 - Red", "Capa 4 - Transporte"], correct: 2 },
                        { question: "¿Cuál es la distancia administrativa de una ruta conectada directamente?", options: ["0", "1", "90", "110"], correct: 0 }
                    ]
                },
                "2": {
                    title: "Quiz - Enrutamiento Estático/Dinámico",
                    questions: [
                        { question: "¿Cuál es la principal ventaja del enrutamiento estático?", options: ["Adaptación automática", "Menor uso recursos", "Escalabilidad", "Convergencia rápida"], correct: 1 },
                        { question: "¿Cuál es la distancia administrativa de EIGRP?", options: ["90", "110", "120", "1"], correct: 0 }
                    ]
                },
                "3": {
                    title: "Quiz - Protocolos Vector Distancia",
                    questions: [
                        { question: "¿Qué algoritmo usan los protocolos de vector distancia?", options: ["Dijkstra", "Bellman-Ford", "SPF", "DUAL"], correct: 1 },
                        { question: "¿Cuál es una técnica para prevenir routing loops?", options: ["Load balancing", "Split horizon", "Fast convergence", "Area design"], correct: 1 }
                    ]
                },
                "4": {
                    title: "Quiz - Configuración Vector Distancia",
                    questions: [
                        { question: "¿Cuál es la métrica máxima en RIP?", options: ["15", "16", "255", "Infinito"], correct: 0 },
                        { question: "¿Qué versión de RIP soporta VLSM?", options: ["RIPv1", "RIPv2", "Ambas", "Ninguna"], correct: 1 }
                    ]
                },
                "5": {
                    title: "Quiz - Tabla Enrutamiento y EIGRP",
                    questions: [
                        { question: "¿Qué algoritmo usa EIGRP?", options: ["Bellman-Ford", "Dijkstra", "DUAL", "SPF"], correct: 2 },
                        { question: "¿Cuál es la distancia administrativa de EIGRP?", options: ["90", "110", "120", "1"], correct: 0 }
                    ]
                },
                "6": {
                    title: "Quiz - Protocolo OSPF",
                    questions: [
                        { question: "¿Qué algoritmo usa OSPF?", options: ["Bellman-Ford", "DUAL", "SPF (Dijkstra)", "Vector distancia"], correct: 2 },
                        { question: "¿Cuál es la distancia administrativa de OSPF?", options: ["90", "110", "120", "1"], correct: 1 }
                    ]
                }
            },
            emergent: {
                "7": {
                    title: "Quiz - Fundamentos Redes Emergentes",
                    questions: [
                        { question: "¿Qué caracteriza a un cliente ligero?", options: ["Alto procesamiento local", "Dependencia del servidor", "Almacenamiento local masivo", "Funcionamiento autónomo"], correct: 1 },
                        { question: "¿Cuál es una ventaja de Bluetooth?", options: ["Gran alcance", "Bajo consumo energético", "Alta velocidad", "Múltiples conexiones"], correct: 1 }
                    ]
                },
                "8": {
                    title: "Quiz - Redes VLAN",
                    questions: [
                        { question: "¿Qué estándar se usa para trunking de VLANs?", options: ["802.1X", "802.1Q", "802.1D", "802.1W"], correct: 1 },
                        { question: "¿Qué método permite comunicación entre VLANs?", options: ["Switch L2", "Hub", "Router L3", "Bridge"], correct: 2 }
                    ]
                }
            }
        };

        // Comprehensive glossary
        this.glossaryData = [
            { term: "VLAN", definition: "Red de área local virtual que segmenta lógicamente una red física", category: "Emergentes" },
            { term: "VoIP", definition: "Voz sobre IP, tecnología para transmitir voz por redes IP", category: "Emergentes" },
            { term: "OSPF", definition: "Open Shortest Path First - Protocolo de enrutamiento de estado de enlace", category: "Tradicionales" },
            { term: "EIGRP", definition: "Enhanced Interior Gateway Routing Protocol - Protocolo híbrido de Cisco", category: "Tradicionales" },
            { term: "Bluetooth", definition: "Tecnología inalámbrica de corto alcance que opera en 2.4 GHz", category: "Emergentes" },
            { term: "Cliente Ligero", definition: "Computadora que depende del servidor para procesamiento", category: "Emergentes" },
            { term: "RIP", definition: "Routing Information Protocol - Protocolo vector distancia", category: "Tradicionales" },
            { term: "802.1Q", definition: "Estándar IEEE para VLAN tagging en redes Ethernet", category: "Emergentes" },
            { term: "LSA", definition: "Link State Advertisement - Anuncio de estado de enlace en OSPF", category: "Tradicionales" },
            { term: "DUAL", definition: "Diffusing Update Algorithm usado por EIGRP", category: "Tradicionales" },
            { term: "G.711", definition: "Códec de voz sin compresión de 64 kbps", category: "Emergentes" },
            { term: "5G NR", definition: "New Radio - Interfaz aérea de quinta generación", category: "Emergentes" },
            { term: "WPA3", definition: "Wi-Fi Protected Access 3 - Último estándar de seguridad WiFi", category: "Emergentes" },
            { term: "VLSM", definition: "Variable Length Subnet Mask - Máscaras de subred variables", category: "Tradicionales" }
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgressDisplay();
        this.showWelcome();
        this.populateGlossary();
    }

    bindEvents() {
        // Track selector events
        document.querySelectorAll('.track-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const trackId = e.currentTarget.dataset.track;
                this.switchTrack(trackId);
            });
        });

        // Navigation events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-button')) {
                const moduleId = e.target.closest('.nav-button').dataset.module;
                this.toggleModule(moduleId);
            }
            
            if (e.target.closest('.subnav a')) {
                e.preventDefault();
                const topicId = e.target.closest('.subnav a').dataset.topic;
                this.showTopic(topicId);
            }
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        // Modal events
        document.getElementById('subnetCalcBtn').addEventListener('click', () => this.showModal('subnetModal'));
        document.getElementById('voipCalcBtn').addEventListener('click', () => this.showModal('voipModal'));
        document.getElementById('wifiCompBtn').addEventListener('click', () => this.showWiFiComparison());
        document.getElementById('glossaryBtn').addEventListener('click', () => this.showModal('glossaryModal'));
        document.getElementById('compareBtn').addEventListener('click', () => this.showComparison());
        
        // Tool buttons
        document.getElementById('routingSimBtn').addEventListener('click', () => this.showRoutingSimulator());
        document.getElementById('vlanSimBtn').addEventListener('click', () => this.showVlanSimulator());

        // Modal close events
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.hideModal(e.target.closest('.modal'));
            });
        });

        // Modal backdrop close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.hideModal(modal);
            });
        });

        // Calculator events
        document.getElementById('calculateSubnet').addEventListener('click', () => this.calculateSubnet());
        document.getElementById('calculateVLSM').addEventListener('click', () => this.calculateVLSM());
        document.getElementById('calculateCustom').addEventListener('click', () => this.calculateCustomSubnets());
        document.getElementById('calculateVoip').addEventListener('click', () => this.calculateVoIP());
        
        // VLSM Tab events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('vlsm-tab')) {
                this.switchVLSMTab(e.target.dataset.tab);
            }
        });

        // Glossary search
        document.getElementById('glossarySearch').addEventListener('input', (e) => {
            this.filterGlossary(e.target.value);
        });

        // Track card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.track-card')) {
                const trackId = e.target.closest('.track-card').dataset.track;
                if (trackId) this.switchTrack(trackId);
            }
        });
    }

    switchTrack(trackId) {
        this.currentTrack = trackId;
        
        // Update track selector buttons
        document.querySelectorAll('.track-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.track === trackId);
        });

        // Show/hide navigation tracks
        document.getElementById('traditionalNav').classList.toggle('hidden', trackId !== 'traditional');
        document.getElementById('emergentNav').classList.toggle('hidden', trackId !== 'emergent');

        // Show/hide tools
        document.querySelector('.tools-traditional').classList.toggle('hidden', trackId !== 'traditional');
        document.querySelector('.tools-emergent').classList.toggle('hidden', trackId !== 'emergent');

        // Update breadcrumb
        this.updateBreadcrumb(`${this.courseData[trackId].title}`);
    }

    startTrack(trackId) {
        this.switchTrack(trackId);
        
        // Show first module of the track
        const firstModule = Object.keys(this.courseData[trackId].modules)[0];
        this.toggleModule(firstModule);
        
        // Show first topic
        const firstTopic = Object.keys(this.courseData[trackId].modules[firstModule].topics)[0];
        this.showTopic(firstTopic);
    }

    toggleModule(moduleId) {
        const button = document.querySelector(`[data-module="${moduleId}"]`);
        const subnav = button.nextElementSibling;
        
        // Close other modules in current track
        const currentNav = document.querySelector(`#${this.currentTrack}Nav`);
        currentNav.querySelectorAll('.nav-button').forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('expanded');
                btn.nextElementSibling.classList.add('hidden');
            }
        });

        // Toggle current module
        button.classList.toggle('expanded');
        subnav.classList.toggle('hidden');
        
        if (!subnav.classList.contains('hidden')) {
            this.currentModule = moduleId;
        }
    }

    showTopic(topicId) {
        // Update active state
        document.querySelectorAll('.subnav a').forEach(link => {
            link.classList.remove('active');
        });
        
        const topicLink = document.querySelector(`[data-topic="${topicId}"]`);
        if (topicLink) topicLink.classList.add('active');

        // Hide other content sections
        document.getElementById('welcomeContent').classList.add('hidden');
        document.getElementById('quizSection').classList.add('hidden');
        document.getElementById('comparisonSection').classList.add('hidden');
        
        // Show topic content
        const contentDiv = document.getElementById('dynamicContent');
        contentDiv.classList.remove('hidden');
        
        const [moduleId] = topicId.split('-');
        const topicData = this.courseData[this.currentTrack]?.modules[moduleId]?.topics[topicId];
        
        if (topicData) {
            contentDiv.innerHTML = this.generateTopicHTML(topicData, moduleId, topicId);
            this.currentTopic = topicId;
            
            // Update breadcrumb
            const moduleTitle = this.courseData[this.currentTrack].modules[moduleId].title;
            this.updateBreadcrumb(`${this.courseData[this.currentTrack].title} > ${moduleTitle} > ${topicData.title}`);
            
            // Mark as visited and update progress
            this.markTopicVisited(this.currentTrack, moduleId, topicId);
            this.updateProgressDisplay();
        }
    }

    generateTopicHTML(topicData, moduleId, topicId) {
        const moduleIcon = this.courseData[this.currentTrack].modules[moduleId].icon;
        const commands = topicData.commands || [];
        const keyPoints = topicData.keyPoints || [];
        const specifications = topicData.specifications || [];
        const technologies = topicData.technologies || [];
        
        let html = `
            <div class="topic-content fade-in">
                <div class="topic-header">
                    <span class="topic-icon">${moduleIcon}</span>
                    <h2 class="topic-title">${topicData.title}</h2>
                    <div class="topic-actions">
                        <button class="btn btn--secondary btn--sm" onclick="app.showQuiz('${moduleId}')">📋 Quiz</button>
                    </div>
                </div>
                
                <div class="topic-body">
                    <p>${topicData.content}</p>
        `;

        // Key points
        if (keyPoints.length > 0) {
            html += `
                <div class="key-points">
                    <h4>🔑 Puntos Clave:</h4>
                    <ul>
                        ${keyPoints.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Specifications
        if (specifications.length > 0) {
            html += `
                <div class="specifications">
                    <h4>📋 Especificaciones:</h4>
                    <ul>
                        ${specifications.map(spec => `<li>${spec}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Technologies
        if (technologies.length > 0) {
            html += `
                <div class="specifications">
                    <h4>🔧 Tecnologías Incluidas:</h4>
                    <ul>
                        ${technologies.map(tech => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Commands
        if (commands.length > 0) {
            html += `
                <div class="command-block">
                    <div class="command-title">💻 Comandos Relacionados:</div>
                    <ul class="command-list">
                        ${commands.map(cmd => `<li><code>${cmd}</code></li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Special content based on topic
        html += this.generateSpecialContent(topicData, topicId);

        html += `
                </div>
            </div>
        `;

        return html;
    }

    generateSpecialContent(topicData, topicId) {
        let html = '';

        // WiFi standards comparison
        if (topicData.standards) {
            html += `
                <div class="tech-grid">
                    ${Object.entries(topicData.standards).map(([standard, specs]) => `
                        <div class="tech-card">
                            <h4>${standard}</h4>
                            <ul class="tech-specs">
                                <li><strong>Frecuencia:</strong> ${specs.frequency}</li>
                                <li><strong>Velocidad:</strong> ${specs.speed}</li>
                                <li><strong>Año:</strong> ${specs.year}</li>
                            </ul>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // VoIP codecs comparison
        if (topicData.codecs) {
            html += `
                <table class="comparison-table">
                    <thead>
                        <tr><th>Códec</th><th>Bitrate</th><th>Calidad</th><th>Delay</th></tr>
                    </thead>
                    <tbody>
                        ${Object.entries(topicData.codecs).map(([codec, specs]) => `
                            <tr>
                                <td><strong>${codec}</strong></td>
                                <td>${specs.bitrate}</td>
                                <td>${specs.quality}</td>
                                <td>${specs.delay}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }

        // Mobile generations
        if (topicData.generations) {
            html += `
                <div class="tech-grid">
                    ${Object.entries(topicData.generations).map(([gen, techs]) => `
                        <div class="tech-card">
                            <h4>${gen}</h4>
                            <ul class="tech-specs">
                                ${techs.map(tech => `<li>${tech}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // VoIP protocols
        if (topicData.protocols) {
            html += `
                <div class="specifications">
                    <h4>📡 Protocolos VoIP:</h4>
                    <ul>
                        ${Object.entries(topicData.protocols).map(([protocol, desc]) => 
                            `<li><strong>${protocol}:</strong> ${desc}</li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        }

        return html;
    }

    showQuiz(moduleId) {
        const quizData = this.quizData[this.currentTrack]?.[moduleId];
        if (!quizData) return;

        document.getElementById('welcomeContent').classList.add('hidden');
        document.getElementById('dynamicContent').classList.add('hidden');
        document.getElementById('comparisonSection').classList.add('hidden');
        
        const quizSection = document.getElementById('quizSection');
        quizSection.classList.remove('hidden');
        
        document.getElementById('quizTitle').textContent = quizData.title;
        document.getElementById('quizContent').innerHTML = this.generateQuizHTML(quizData, moduleId);

        this.updateBreadcrumb(`${this.courseData[this.currentTrack].title} > ${quizData.title}`);
    }

    generateQuizHTML(quizData, moduleId) {
        let html = '';
        
        quizData.questions.forEach((q, index) => {
            html += `
                <div class="quiz-question">
                    <h4>Pregunta ${index + 1}: ${q.question}</h4>
                    <div class="quiz-options">
                        ${q.options.map((option, optIndex) => `
                            <div class="quiz-option" data-question="${index}" data-option="${optIndex}">
                                ${option}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        html += `
            <div class="quiz-actions">
                <button class="btn btn--primary" onclick="app.submitQuiz('${moduleId}')">Enviar Respuestas</button>
                <button class="btn btn--secondary" onclick="app.showWelcome()">Volver al Inicio</button>
            </div>
            <div id="quizResults" class="quiz-results hidden"></div>
        `;
        
        // Add click events to options
        setTimeout(() => {
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const question = e.target.dataset.question;
                    document.querySelectorAll(`[data-question="${question}"]`).forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    e.target.classList.add('selected');
                });
            });
        }, 100);
        
        return html;
    }

    submitQuiz(moduleId) {
        const quizData = this.quizData[this.currentTrack][moduleId];
        const results = document.getElementById('quizResults');
        let score = 0;
        let total = quizData.questions.length;
        
        quizData.questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`[data-question="${index}"].selected`);
            const correctOption = document.querySelector(`[data-question="${index}"][data-option="${q.correct}"]`);
            
            if (selectedOption) {
                const selectedIndex = parseInt(selectedOption.dataset.option);
                if (selectedIndex === q.correct) {
                    selectedOption.classList.add('correct');
                    score++;
                } else {
                    selectedOption.classList.add('incorrect');
                }
            }
            
            correctOption.classList.add('correct');
        });
        
        const percentage = Math.round((score / total) * 100);
        results.innerHTML = `
            <div class="quiz-score">${score}/${total}</div>
            <p>Has obtenido un ${percentage}% de respuestas correctas.</p>
            ${percentage >= 70 ? 
                '<p class="status status--success">¡Excelente! Has aprobado este módulo.</p>' : 
                '<p class="status status--warning">Necesitas repasar este módulo. Se recomienda un 70% o más.</p>'
            }
        `;
        results.classList.remove('hidden');
        
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        if (percentage >= 70) {
            this.markModuleCompleted(this.currentTrack, moduleId);
            this.updateProgressDisplay();
        }
    }

    showWelcome() {
        document.getElementById('dynamicContent').classList.add('hidden');
        document.getElementById('quizSection').classList.add('hidden');
        document.getElementById('comparisonSection').classList.add('hidden');
        document.getElementById('welcomeContent').classList.remove('hidden');
        
        document.querySelectorAll('.subnav a').forEach(link => {
            link.classList.remove('active');
        });

        this.updateBreadcrumb('Inicio');
        this.updateProgressDisplay();
    }

    showComparison() {
        document.getElementById('welcomeContent').classList.add('hidden');
        document.getElementById('dynamicContent').classList.add('hidden');
        document.getElementById('quizSection').classList.add('hidden');
        
        const comparisonSection = document.getElementById('comparisonSection');
        comparisonSection.classList.remove('hidden');
        
        document.getElementById('comparisonContent').innerHTML = this.generateComparisonHTML();
        this.updateBreadcrumb('Comparación de Tecnologías');
    }

    generateComparisonHTML() {
        return `
            <div class="comparison-content">
                <p>Comparación entre tecnologías tradicionales y emergentes de redes:</p>
                
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Aspecto</th>
                            <th>Redes Tradicionales</th>
                            <th>Redes Emergentes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Enfoque Principal</strong></td>
                            <td>Enrutamiento y conmutación básica</td>
                            <td>Convergencia y servicios avanzados</td>
                        </tr>
                        <tr>
                            <td><strong>Protocolos Clave</strong></td>
                            <td>RIP, EIGRP, OSPF</td>
                            <td>VoIP (SIP, H.323), 802.11ax, 5G</td>
                        </tr>
                        <tr>
                            <td><strong>Velocidades</strong></td>
                            <td>10/100/1000 Mbps Ethernet</td>
                            <td>Multi-gigabit, 5G (hasta 20 Gbps)</td>
                        </tr>
                        <tr>
                            <td><strong>Complejidad</strong></td>
                            <td>Configuración manual, estática</td>
                            <td>Automatizada, inteligente</td>
                        </tr>
                        <tr>
                            <td><strong>Servicios</strong></td>
                            <td>Conectividad básica</td>
                            <td>Voz, video, datos convergentes</td>
                        </tr>
                        <tr>
                            <td><strong>Seguridad</strong></td>
                            <td>ACLs, VLANs básicas</td>
                            <td>WPA3, autenticación 802.1X, cifrado avanzado</td>
                        </tr>
                        <tr>
                            <td><strong>Movilidad</strong></td>
                            <td>Limitada a cableado</td>
                            <td>Total: WiFi 6, 5G, seamless handover</td>
                        </tr>
                        <tr>
                            <td><strong>Gestión</strong></td>
                            <td>CLI, SNMP básico</td>
                            <td>SDN, APIs REST, cloud management</td>
                        </tr>
                    </tbody>
                </table>

                <div class="tech-evolution">
                    <h3>🚀 Evolución Tecnológica</h3>
                    <div class="tech-grid">
                        <div class="tech-card">
                            <h4>📡 Conectividad</h4>
                            <ul class="tech-specs">
                                <li><strong>Antes:</strong> Ethernet 10/100 Mbps</li>
                                <li><strong>Ahora:</strong> WiFi 6E (6 GHz), 5G</li>
                                <li><strong>Futuro:</strong> WiFi 7, 6G (THz)</li>
                            </ul>
                        </div>
                        <div class="tech-card">
                            <h4>☎️ Comunicaciones</h4>
                            <ul class="tech-specs">
                                <li><strong>Antes:</strong> PSTN analógica</li>
                                <li><strong>Ahora:</strong> VoIP, UC</li>
                                <li><strong>Futuro:</strong> Comunicaciones holográficas</li>
                            </ul>
                        </div>
                        <div class="tech-card">
                            <h4>🔒 Seguridad</h4>
                            <ul class="tech-specs">
                                <li><strong>Antes:</strong> WEP, passwords simples</li>
                                <li><strong>Ahora:</strong> WPA3, MFA, zero trust</li>
                                <li><strong>Futuro:</strong> Quantum encryption</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showWiFiComparison() {
        this.showModal('wifiModal');
        
        const wifiData = this.courseData.emergent.modules["10"].topics["10-2"];
        if (wifiData && wifiData.standards) {
            document.getElementById('wifiComparison').innerHTML = `
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Estándar</th>
                            <th>Frecuencia</th>
                            <th>Velocidad Máx</th>
                            <th>Año</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(wifiData.standards).map(([standard, specs]) => `
                            <tr>
                                <td><strong>${standard}</strong></td>
                                <td>${specs.frequency}</td>
                                <td>${specs.speed}</td>
                                <td>${specs.year}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="wifi-info">
                    <h4>📊 Análisis de Evolución</h4>
                    <p>La evolución de los estándares WiFi muestra un incremento exponencial en velocidades y mejoras en eficiencia espectral. WiFi 6 (802.11ax) introduce OFDMA y tecnologías MIMO avanzadas.</p>
                </div>
            `;
        }
    }

    switchVLSMTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.vlsm-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update mode panels
        document.querySelectorAll('.vlsm-mode').forEach(mode => {
            mode.classList.add('hidden');
            mode.classList.remove('active');
        });
        
        const modeMap = {
            'simple': 'simpleMode',
            'vlsm': 'vlsmMode', 
            'custom': 'customMode'
        };
        
        const targetMode = document.getElementById(modeMap[tabName]);
        targetMode.classList.remove('hidden');
        targetMode.classList.add('active');
        
        // Clear previous results
        document.getElementById('subnetResults').classList.add('hidden');
    }

    calculateSubnet() {
        const networkIP = document.getElementById('networkIP').value;
        const subnetMask = parseInt(document.getElementById('subnetMask').value);
        
        if (!this.validateIP(networkIP)) {
            alert('Por favor ingresa una dirección IP válida (formato: x.x.x.x)');
            return;
        }
        
        try {
            const result = this.performSubnetCalculation(networkIP, subnetMask);
            document.getElementById('subnetResults').innerHTML = this.formatSubnetResults(result);
            document.getElementById('subnetResults').classList.remove('hidden');
        } catch (error) {
            alert('Error en el cálculo: ' + error.message);
        }
    }

    calculateVLSM() {
        const networkInput = document.getElementById('vlsmNetwork').value;
        const hostReqInput = document.getElementById('hostRequirements').value;
        
        if (!networkInput || !hostReqInput) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        try {
            const [networkIP, prefixStr] = networkInput.split('/');
            const prefix = parseInt(prefixStr);
            const hostRequirements = hostReqInput.split(',').map(h => parseInt(h.trim())).filter(h => h > 0);
            
            if (!this.validateIP(networkIP) || !prefix || hostRequirements.length === 0) {
                throw new Error('Formato inválido');
            }
            
            const vlsmResults = this.performVLSMCalculation(networkIP, prefix, hostRequirements);
            document.getElementById('subnetResults').innerHTML = this.formatVLSMResults(vlsmResults);
            document.getElementById('subnetResults').classList.remove('hidden');
        } catch (error) {
            alert('Error en el cálculo VLSM: ' + error.message);
        }
    }

    calculateCustomSubnets() {
        const networkInput = document.getElementById('customNetwork').value;
        const numSubnets = parseInt(document.getElementById('numSubnets').value);
        const subnetBits = parseInt(document.getElementById('subnetBits').value);
        
        if (!networkInput || !numSubnets || !subnetBits) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        try {
            const [networkIP, prefixStr] = networkInput.split('/');
            const prefix = parseInt(prefixStr);
            
            if (!this.validateIP(networkIP) || !prefix) {
                throw new Error('Formato de red inválido');
            }
            
            const customResults = this.performCustomSubnetting(networkIP, prefix, numSubnets, subnetBits);
            document.getElementById('subnetResults').innerHTML = this.formatCustomResults(customResults);
            document.getElementById('subnetResults').classList.remove('hidden');
        } catch (error) {
            alert('Error en el cálculo personalizado: ' + error.message);
        }
    }

    validateIP(ip) {
        const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
        if (!ipRegex.test(ip)) return false;
        
        const octets = ip.split('.').map(Number);
        return octets.every(octet => octet >= 0 && octet <= 255);
    }

    performSubnetCalculation(networkIP, prefixLength) {
        const ip = networkIP.split('.').map(Number);
        const hostBits = 32 - prefixLength;
        const numHosts = Math.pow(2, hostBits) - 2;
        
        const mask = [];
        let remaining = prefixLength;
        for (let i = 0; i < 4; i++) {
            if (remaining >= 8) {
                mask.push(255);
                remaining -= 8;
            } else if (remaining > 0) {
                mask.push(256 - Math.pow(2, 8 - remaining));
                remaining = 0;
            } else {
                mask.push(0);
            }
        }
        
        const network = ip.map((octet, i) => octet & mask[i]);
        const broadcast = network.map((octet, i) => octet | (255 - mask[i]));
        
        const firstHost = [...network];
        if (firstHost[3] < 255) firstHost[3]++;
        
        const lastHost = [...broadcast];
        if (lastHost[3] > 0) lastHost[3]--;
        
        return {
            network: network.join('.'),
            mask: mask.join('.'),
            broadcast: broadcast.join('.'),
            firstHost: firstHost.join('.'),
            lastHost: lastHost.join('.'),
            numHosts: numHosts > 0 ? numHosts : 0,
            prefixLength: `/${prefixLength}`,
            subnetBits: prefixLength - 24 > 0 ? prefixLength - 24 : 0
        };
    }

    performVLSMCalculation(networkIP, prefix, hostRequirements) {
        // Sort requirements in descending order for optimal allocation
        const sortedReqs = hostRequirements.map((hosts, index) => ({ hosts, originalIndex: index }))
            .sort((a, b) => b.hosts - a.hosts);
        
        const results = [];
        let currentNetwork = this.ipToInt(networkIP);
        const networkMask = (0xFFFFFFFF << (32 - prefix)) >>> 0;
        const baseNetwork = currentNetwork & networkMask;
        
        for (let i = 0; i < sortedReqs.length; i++) {
            const requiredHosts = sortedReqs[i].hosts;
            const hostBits = Math.ceil(Math.log2(requiredHosts + 2)); // +2 for network and broadcast
            const subnetPrefix = 32 - hostBits;
            const subnetSize = Math.pow(2, hostBits);
            
            if (subnetPrefix < prefix) {
                throw new Error(`No hay suficiente espacio para ${requiredHosts} hosts`);
            }
            
            const subnetMask = (0xFFFFFFFF << hostBits) >>> 0;
            const network = currentNetwork & subnetMask;
            const broadcast = network + subnetSize - 1;
            
            results.push({
                originalIndex: sortedReqs[i].originalIndex,
                requiredHosts,
                network: this.intToIP(network),
                mask: this.intToIP(subnetMask),
                broadcast: this.intToIP(broadcast),
                firstHost: this.intToIP(network + 1),
                lastHost: this.intToIP(broadcast - 1),
                availableHosts: subnetSize - 2,
                prefixLength: subnetPrefix,
                wastedHosts: (subnetSize - 2) - requiredHosts
            });
            
            currentNetwork = broadcast + 1;
        }
        
        // Sort back to original order
        return results.sort((a, b) => a.originalIndex - b.originalIndex);
    }
    
    performCustomSubnetting(networkIP, prefix, numSubnets, subnetBits) {
        const newPrefix = prefix + subnetBits;
        if (newPrefix > 30) {
            throw new Error('Demasiados bits de subred');
        }
        
        const maxSubnets = Math.pow(2, subnetBits);
        if (numSubnets > maxSubnets) {
            throw new Error(`Máximo ${maxSubnets} subredes con ${subnetBits} bits`);
        }
        
        const results = [];
        const baseNetwork = this.ipToInt(networkIP);
        const hostBits = 32 - newPrefix;
        const subnetSize = Math.pow(2, hostBits);
        
        for (let i = 0; i < numSubnets; i++) {
            const network = baseNetwork + (i * subnetSize);
            const broadcast = network + subnetSize - 1;
            const subnetMask = (0xFFFFFFFF << hostBits) >>> 0;
            
            results.push({
                subnetNumber: i + 1,
                network: this.intToIP(network),
                mask: this.intToIP(subnetMask),
                broadcast: this.intToIP(broadcast),
                firstHost: this.intToIP(network + 1),
                lastHost: this.intToIP(broadcast - 1),
                availableHosts: subnetSize - 2,
                prefixLength: newPrefix
            });
        }
        
        return results;
    }
    
    ipToInt(ip) {
        return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
    }
    
    intToIP(int) {
        return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
    }

    formatSubnetResults(result) {
        return `
            <h4>📊 Resultados del Cálculo</h4>
            <div class="result-grid">
                <div class="result-item">
                    <strong>Red:</strong>
                    <span>${result.network}${result.prefixLength}</span>
                </div>
                <div class="result-item">
                    <strong>Máscara:</strong>
                    <span>${result.mask}</span>
                </div>
                <div class="result-item">
                    <strong>Broadcast:</strong>
                    <span>${result.broadcast}</span>
                </div>
                <div class="result-item">
                    <strong>Primer Host:</strong>
                    <span>${result.firstHost}</span>
                </div>
                <div class="result-item">
                    <strong>Último Host:</strong>
                    <span>${result.lastHost}</span>
                </div>
                <div class="result-item">
                    <strong>Hosts Válidos:</strong>
                    <span>${result.numHosts}</span>
                </div>
            </div>
            <div class="subnet-info">
                <h5>💡 Información Adicional</h5>
                <p><strong>Clase de Red:</strong> ${this.getNetworkClass(result.network)}</p>
                <p><strong>Tipo:</strong> ${result.numHosts <= 2 ? 'Enlace punto a punto' : result.numHosts <= 14 ? 'Red pequeña' : result.numHosts <= 254 ? 'Red mediana' : 'Red grande'}</p>
                <p><strong>Bits de Host:</strong> ${32 - parseInt(result.prefixLength.substring(1))}</p>
            </div>
        `;
    }
    
    formatVLSMResults(results) {
        let html = `
            <h4>📊 Resultados VLSM</h4>
            <div class="vlsm-summary">
                <p><strong>Total de Subredes:</strong> ${results.length}</p>
                <p><strong>Hosts Totales Requeridos:</strong> ${results.reduce((sum, r) => sum + r.requiredHosts, 0)}</p>
                <p><strong>Hosts Totales Disponibles:</strong> ${results.reduce((sum, r) => sum + r.availableHosts, 0)}</p>
                <p><strong>Eficiencia:</strong> ${Math.round((results.reduce((sum, r) => sum + r.requiredHosts, 0) / results.reduce((sum, r) => sum + r.availableHosts, 0)) * 100)}%</p>
            </div>
            <table class="vlsm-table">
                <thead>
                    <tr>
                        <th>Subred</th>
                        <th>Requeridos</th>
                        <th>Red</th>
                        <th>Máscara</th>
                        <th>Rango Hosts</th>
                        <th>Broadcast</th>
                        <th>Disponibles</th>
                        <th>Desperdicio</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        results.forEach((result, index) => {
            html += `
                <tr>
                    <td><strong>#${index + 1}</strong></td>
                    <td>${result.requiredHosts}</td>
                    <td>${result.network}/${result.prefixLength}</td>
                    <td>${result.mask}</td>
                    <td>${result.firstHost} - ${result.lastHost}</td>
                    <td>${result.broadcast}</td>
                    <td>${result.availableHosts}</td>
                    <td class="${result.wastedHosts > result.requiredHosts * 0.5 ? 'waste-high' : 'waste-low'}">${result.wastedHosts}</td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
            <div class="vlsm-tips">
                <h5>💡 Consejos VLSM</h5>
                <ul>
                    <li>Las subredes se asignan en orden descendente por tamaño para optimizar el uso del espacio</li>
                    <li>Un desperdicio alto (rojo) indica ineficiencia en la asignación</li>
                    <li>Considera reagrupar requerimientos similares para mejor eficiencia</li>
                </ul>
            </div>
        `;
        
        return html;
    }
    
    formatCustomResults(results) {
        let html = `
            <h4>📊 Subredes Personalizadas</h4>
            <div class="custom-summary">
                <p><strong>Total de Subredes:</strong> ${results.length}</p>
                <p><strong>Hosts por Subred:</strong> ${results[0].availableHosts}</p>
                <p><strong>Prefijo de Subred:</strong> /${results[0].prefixLength}</p>
            </div>
            <table class="custom-table">
                <thead>
                    <tr>
                        <th>Subred</th>
                        <th>Red</th>
                        <th>Máscara</th>
                        <th>Primer Host</th>
                        <th>Último Host</th>
                        <th>Broadcast</th>
                        <th>Hosts</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        results.forEach(result => {
            html += `
                <tr>
                    <td><strong>#${result.subnetNumber}</strong></td>
                    <td>${result.network}/${result.prefixLength}</td>
                    <td>${result.mask}</td>
                    <td>${result.firstHost}</td>
                    <td>${result.lastHost}</td>
                    <td>${result.broadcast}</td>
                    <td>${result.availableHosts}</td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
        
        return html;
    }
    
    getNetworkClass(ip) {
        const firstOctet = parseInt(ip.split('.')[0]);
        if (firstOctet >= 1 && firstOctet <= 126) return 'Clase A';
        if (firstOctet >= 128 && firstOctet <= 191) return 'Clase B';
        if (firstOctet >= 192 && firstOctet <= 223) return 'Clase C';
        if (firstOctet >= 224 && firstOctet <= 239) return 'Clase D (Multicast)';
        return 'Clase E (Experimental)';
    }

    calculateVoIP() {
        const codec = document.getElementById('codecSelect').value;
        const numCalls = parseInt(document.getElementById('numCalls').value);
        
        const codecData = {
            g711: { bitrate: 64, overhead: 40, name: "G.711" },
            g729: { bitrate: 8, overhead: 40, name: "G.729" },
            g723: { bitrate: 6.3, overhead: 40, name: "G.723.1" }
        };
        
        const selectedCodec = codecData[codec];
        const totalBandwidth = (selectedCodec.bitrate + selectedCodec.overhead) * numCalls;
        
        document.getElementById('voipResults').innerHTML = `
            <h4>📞 Resultados Cálculo VoIP</h4>
            <div class="result-grid">
                <div class="result-item">
                    <strong>Códec:</strong>
                    <span>${selectedCodec.name}</span>
                </div>
                <div class="result-item">
                    <strong>Bitrate por llamada:</strong>
                    <span>${selectedCodec.bitrate} kbps</span>
                </div>
                <div class="result-item">
                    <strong>Overhead IP/RTP:</strong>
                    <span>${selectedCodec.overhead} kbps</span>
                </div>
                <div class="result-item">
                    <strong>Total por llamada:</strong>
                    <span>${selectedCodec.bitrate + selectedCodec.overhead} kbps</span>
                </div>
                <div class="result-item">
                    <strong>Número de llamadas:</strong>
                    <span>${numCalls}</span>
                </div>
                <div class="result-item">
                    <strong>Ancho de banda total:</strong>
                    <span>${totalBandwidth} kbps (${(totalBandwidth/1000).toFixed(2)} Mbps)</span>
                </div>
            </div>
            <p style="margin-top: 16px; padding: 12px; background: var(--color-bg-4); border-radius: var(--radius-base); font-size: var(--font-size-sm);">
                💡 <strong>Recomendación:</strong> Considera un 20% adicional para overhead de red y tráfico de señalización.
            </p>
        `;
        document.getElementById('voipResults').classList.remove('hidden');
    }

    populateGlossary() {
        const glossaryContent = document.getElementById('glossaryContent');
        this.renderGlossaryItems(this.glossaryData);
    }

    renderGlossaryItems(items) {
        const glossaryContent = document.getElementById('glossaryContent');
        glossaryContent.innerHTML = items.map(item => `
            <div class="glossary-item">
                <div class="glossary-term">${item.term}</div>
                <div class="glossary-definition">${item.definition}</div>
                <div class="glossary-category">${item.category}</div>
            </div>
        `).join('');
    }

    filterGlossary(query) {
        if (!query.trim()) {
            this.renderGlossaryItems(this.glossaryData);
            return;
        }
        
        const filtered = this.glossaryData.filter(item =>
            item.term.toLowerCase().includes(query.toLowerCase()) ||
            item.definition.toLowerCase().includes(query.toLowerCase())
        );
        
        this.renderGlossaryItems(filtered);
    }

    performSearch(query) {
        if (query.length < 2) return;
        
        const results = [];
        Object.entries(this.courseData).forEach(([trackId, track]) => {
            Object.entries(track.modules).forEach(([moduleId, module]) => {
                Object.entries(module.topics).forEach(([topicId, topic]) => {
                    if (topic.title.toLowerCase().includes(query.toLowerCase()) ||
                        topic.content.toLowerCase().includes(query.toLowerCase())) {
                        results.push({
                            trackId,
                            moduleId,
                            topicId,
                            title: topic.title,
                            moduleTitle: module.title
                        });
                    }
                });
            });
        });
        
        if (results.length > 0) {
            const firstResult = results[0];
            this.switchTrack(firstResult.trackId);
            this.showTopic(firstResult.topicId);
            
            const moduleButton = document.querySelector(`[data-module="${firstResult.moduleId}"]`);
            const subnav = moduleButton.nextElementSibling;
            moduleButton.classList.add('expanded');
            subnav.classList.remove('hidden');
        }
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }

    hideModal(modal) {
        modal.classList.add('hidden');
    }

    showRoutingSimulator() {
        alert('🔧 Simulador de Enrutamiento\n\nEsta herramienta permite simular configuraciones de enrutamiento y visualizar el comportamiento de protocolos como RIP, EIGRP y OSPF.\n\n¡Próximamente disponible!');
    }

    showVlanSimulator() {
        alert('🌐 Simulador VLAN\n\nEsta herramienta permite configurar y probar diferentes topologías VLAN, incluyendo trunking y enrutamiento inter-VLAN.\n\n¡Próximamente disponible!');
    }

    updateBreadcrumb(text) {
        document.getElementById('breadcrumbContent').textContent = text;
    }

    markTopicVisited(trackId, moduleId, topicId) {
        if (!this.progress[trackId]) this.progress[trackId] = {};
        if (!this.progress[trackId][moduleId]) {
            this.progress[trackId][moduleId] = { visited: [], completed: false };
        }
        
        if (!this.progress[trackId][moduleId].visited.includes(topicId)) {
            this.progress[trackId][moduleId].visited.push(topicId);
            this.saveProgress();
        }
    }

    markModuleCompleted(trackId, moduleId) {
        if (!this.progress[trackId]) this.progress[trackId] = {};
        if (!this.progress[trackId][moduleId]) {
            this.progress[trackId][moduleId] = { visited: [], completed: false };
        }
        
        this.progress[trackId][moduleId].completed = true;
        this.saveProgress();
    }

    updateProgressDisplay() {
        // Update main progress bars
        ['traditional', 'emergent'].forEach(trackId => {
            const trackData = this.courseData[trackId];
            const totalModules = Object.keys(trackData.modules).length;
            let completedModules = 0;
            
            Object.keys(trackData.modules).forEach(moduleId => {
                const moduleProgress = this.progress[trackId]?.[moduleId];
                if (moduleProgress?.completed) {
                    completedModules++;
                }
            });
            
            const percentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
            const progressEl = document.getElementById(`${trackId}Progress`);
            if (progressEl) {
                progressEl.style.width = `${percentage}%`;
                progressEl.parentElement.nextElementSibling.textContent = `${Math.round(percentage)}% completado`;
            }
        });
    }

    loadProgress() {
        // Since localStorage is not available, return empty object
        return {};
    }

    saveProgress() {
        // Since localStorage is not available, just log the progress
        console.log('Progress saved:', this.progress);
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new NetworkCourseApp();
});