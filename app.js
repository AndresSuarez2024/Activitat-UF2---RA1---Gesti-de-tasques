class Tasca {
    static totalTasques = 0; // Comptador estàtic de tasques creades
    #id;
    #nom;
    #completada;

    constructor(nom, prioritat, tipus) {
        this.#id = ++Tasca.totalTasques; // Assigna un ID únic
        this.#nom = nom;
        this.#completada = false; // Per defecte, la tasca no està completada
        this.prioritat = prioritat;
        this.tipus = tipus;
    }

    get id() {
        return this.#id;
    }

    get nom() {
        return this.#nom;
    }

    set nom(value) {
        this.#nom = value;
    }

    set completada(value) {
        this.#completada = value;
    }

    estaCompletada() {
        return this.#completada;
    }

    mostrarInfoTasca() {
        return `ID: ${this.#id} - Nom: ${this.#nom}, Tipus: ${this.tipus}, Prioritat: ${this.prioritat}, Completada: ${this.#completada ? 'Sí' : 'No'}`;
    }

    static obtenirTotalTasques() {
        return Tasca.totalTasques;
    }
}

// Classe per a tasques crítiques amb data límit i descripció
class Critica extends Tasca {
    #dataLimit;
    #descripcio;

    constructor(nom, prioritat, dataLimit, descripcio) {
        super(nom, prioritat, "Crítica");
        this.#dataLimit = dataLimit;
        this.#descripcio = descripcio;
    }

    get dataLimit() {
        return this.#dataLimit;
    }

    set dataLimit(novaData) {
        this.#dataLimit = novaData;
    }

    mostrarInfoTasca() {
        return `${super.mostrarInfoTasca()}, Data Límit: ${this.#dataLimit}, Descripció: ${this.#descripcio}`;
    }
}

// Classe per a tasques urgents amb recordatori
class Urgent extends Tasca {
    #recordatori;

    constructor(nom, prioritat, recordatori) {
        super(nom, prioritat, "Urgent");
        this.#recordatori = recordatori;
    }

    mostrarInfoTasca() {
        return `${super.mostrarInfoTasca()}, Recordatori: ${this.#recordatori}`;
    }
}

// Classe principal que gestiona la llista de tasques
class App {
    constructor() {
        this.tasques = [];
    }

    afegirTasca(tasca) {
        this.tasques.push(tasca);
    }

    completarTasca(id) {
        const tasca = this.tasques.find(t => t.id === id);
        if (tasca && !tasca.estaCompletada()) {
            tasca.completada = true;
        }
    }

    eliminarTasca(id) {
        this.tasques = this.tasques.filter(t => t.id !== id);
    }

    modificaNomTasca(id, nom) {
        const tasca = this.tasques.find(t => t.id === id);
        if (tasca) {
            tasca.nom = nom;
        }
    }

    actualitzarLlista() {
        console.log("\nLlista de Tasques:");
        this.tasques.forEach(tasca => {
            console.log(tasca.mostrarInfoTasca());
        });
    }

    mostrarTotalTasques() {
        console.log(`\nTotal de tasques: ${this.tasques.length}`);
    }
}

// Creació de l'APP i proves de funcionament
const app = new App();

app.actualitzarLlista();
app.mostrarTotalTasques();

// Afegim 4 tasques (2 normals, 1 urgent, 1 crítica)
const tasca1 = new Tasca("Tasca normal 1", 2, "Normal");
const tasca2 = new Tasca("Tasca normal 2", 1, "Normal");
const tascaUrgent = new Urgent("Tasca urgent", 3, "Recordatori urgent");
const tascaCritica = new Critica("Tasca crítica", 5, "2025-03-01", "Descripció crítica");

app.afegirTasca(tasca1);
app.afegirTasca(tasca2);
app.afegirTasca(tascaUrgent);
app.afegirTasca(tascaCritica);

app.actualitzarLlista();
app.mostrarTotalTasques();

// Modifiquem una tasca
app.modificaNomTasca(tasca1.id, "Tasca normal modificada");

// Completem 2 tasques
app.completarTasca(tasca1.id);
app.completarTasca(tascaUrgent.id);

// Afegim una nova tasca
const tascaNova = new Tasca("Tasca nova", 4, "Normal");
app.afegirTasca(tascaNova);

app.actualitzarLlista();
app.mostrarTotalTasques();

// Eliminem dues tasques
app.eliminarTasca(tasca2.id);
app.eliminarTasca(tascaNova.id);

app.actualitzarLlista();
app.mostrarTotalTasques();
