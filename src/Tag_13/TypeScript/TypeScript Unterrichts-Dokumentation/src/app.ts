// TypeScript Learning Application
// Hauptanwendung für die interaktive TypeScript-Lern-Plattform

// Prism wird per CDN-Script-Tag geladen (kein npm-Import)
declare const Prism: { highlightAll(): void };

interface LessonData {
    name: string;
    progress: boolean;
}

class TypeScriptLearningApp {
    private currentLesson: string = 'basics';
    private lessons: LessonData[] = [
        { name: 'basics', progress: false },
        { name: 'interfaces', progress: false },
        { name: 'classes', progress: false },
        { name: 'generics', progress: false },
        { name: 'unions', progress: false },
        { name: 'enums', progress: false },
        { name: 'functions', progress: false },
        { name: 'modules', progress: false }
    ];

    constructor() {
        this.initializeEventListeners();
        this.updateProgress();
        // Syntax highlighting aktivieren
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }

    private initializeEventListeners(): void {
        // Navigation Event Listener
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLButtonElement;
                const lesson = target.dataset.lesson;
                if (lesson) {
                    this.switchLesson(lesson);
                }
            });
        });

        // Run Button Event Listeners
        this.setupRunButtons();
    }

    private switchLesson(lessonName: string): void {
        // Aktuelle Lesson deaktivieren
        const currentActive = document.querySelector('.lesson-panel.active');
        const currentNavActive = document.querySelector('.nav-btn.active');
        
        if (currentActive) currentActive.classList.remove('active');
        if (currentNavActive) currentNavActive.classList.remove('active');

        // Neue Lesson aktivieren
        const newLesson = document.getElementById(`lesson-${lessonName}`);
        const newNavBtn = document.querySelector(`[data-lesson="${lessonName}"]`);
        
        if (newLesson) newLesson.classList.add('active');
        if (newNavBtn) newNavBtn.classList.add('active');

        this.currentLesson = lessonName;
    }

    private setupRunButtons(): void {
        // Basics Example
        document.getElementById('run-basics')?.addEventListener('click', () => {
            this.runBasicsExample();
            this.markLessonComplete('basics');
        });

        // Interfaces Example
        document.getElementById('run-interfaces')?.addEventListener('click', () => {
            this.runInterfacesExample();
            this.markLessonComplete('interfaces');
        });

        // Classes Example
        document.getElementById('run-classes')?.addEventListener('click', () => {
            this.runClassesExample();
            this.markLessonComplete('classes');
        });

        // Generics Example
        document.getElementById('run-generics')?.addEventListener('click', () => {
            this.runGenericsExample();
            this.markLessonComplete('generics');
        });

        // Union Types Example
        document.getElementById('run-unions')?.addEventListener('click', () => {
            this.runUnionsExample();
            this.markLessonComplete('unions');
        });

        // Enums Example
        document.getElementById('run-enums')?.addEventListener('click', () => {
            this.runEnumsExample();
            this.markLessonComplete('enums');
        });

        // Functions Example
        document.getElementById('run-functions')?.addEventListener('click', () => {
            this.runFunctionsExample();
            this.markLessonComplete('functions');
        });

        // Modules Example
        document.getElementById('run-modules')?.addEventListener('click', () => {
            this.runModulesExample();
            this.markLessonComplete('modules');
        });
    }

    private displayOutput(elementId: string, content: string, type: 'success' | 'error' = 'success'): void {
        const outputElement = document.getElementById(elementId);
        if (outputElement) {
            outputElement.textContent = content;
            outputElement.className = `output ${type}`;
            outputElement.style.display = 'block';
        }
    }

    private runBasicsExample(): void {
        try {
            function addNumbers(a: number, b: number): number {
                return a + b;
            }

            const result1 = addNumbers(5, 3);
            const result2 = addNumbers(10, 20);
            
            const output = `TypeScript Typsicherheit Demo:
Ergebnis 1: ${result1}
Ergebnis 2: ${result2}

TypeScript verhindert folgende Fehler zur Compile-Zeit:
- addNumbers("5", 3)  String statt Zahl
- addNumbers(5)       Fehlender Parameter
- addNumbers(5, 3, 1) Zu viele Parameter`;

            this.displayOutput('basics-output', output);
        } catch (error) {
            this.displayOutput('basics-output', `Fehler: ${error}`, 'error');
        }
    }

    private runInterfacesExample(): void {
        try {
            interface Student {
                name: string;
                age: number;
                courses: string[];
                isActive?: boolean;
            }

            const student1: Student = {
                name: "Anna Müller",
                age: 20,
                courses: ["TypeScript", "React", "Node.js"],
                isActive: true
            };

            const student2: Student = {
                name: "Max Schmidt",
                age: 22,
                courses: ["JavaScript", "Python"]
                // isActive ist optional
            };

            function printStudentInfo(student: Student): string {
                return `${student.name} ist ${student.age} Jahre alt
Kurse: ${student.courses.join(', ')}
Status: ${student.isActive ? 'Aktiv' : 'Inaktiv'}`;
            }

            const output = `Interface Demo:

Student 1:
${printStudentInfo(student1)}

Student 2:
${printStudentInfo(student2)}

Interfaces sorgen für:
- Strukturelle Typsicherheit
- Optionale Eigenschaften
- Wiederverwendbare Typdefinitionen`;

            this.displayOutput('interfaces-output', output);
        } catch (error) {
            this.displayOutput('interfaces-output', `Fehler: ${error}`, 'error');
        }
    }

    private runClassesExample(): void {
        try {
            class Vehicle {
                protected brand: string;
                private _speed: number = 0;

                constructor(brand: string) {
                    this.brand = brand;
                }

                public get speed(): number {
                    return this._speed;
                }

                public accelerate(amount: number): void {
                    this._speed += amount;
                }

                public getInfo(): string {
                    return `${this.brand} - Geschwindigkeit: ${this._speed} km/h`;
                }
            }

            class Car extends Vehicle {
                private doors: number;

                constructor(brand: string, doors: number) {
                    super(brand);
                    this.doors = doors;
                }

                public getCarInfo(): string {
                    return `${this.brand} Auto mit ${this.doors} Türen`;
                }
            }

            const car = new Car("BMW", 4);
            car.accelerate(50);
            car.accelerate(30);

            const output = `Classes Demo:

${car.getCarInfo()}
${car.getInfo()}
Aktuelle Geschwindigkeit (Getter): ${car.speed} km/h

Zugriffsmodifikatoren:
- public: Von überall zugänglich
- private: Nur innerhalb der Klasse
- protected: In Klasse und Unterklassen

Vererbung:
Car erbt von Vehicle und erweitert die Funktionalität`;

            this.displayOutput('classes-output', output);
        } catch (error) {
            this.displayOutput('classes-output', `Fehler: ${error}`, 'error');
        }
    }

    private runGenericsExample(): void {
        try {
            function identity<T>(arg: T): T {
                return arg;
            }

            class DataStore<T> {
                private items: T[] = [];

                add(item: T): void {
                    this.items.push(item);
                }

                getAll(): T[] {
                    return this.items;
                }

                count(): number {
                    return this.items.length;
                }
            }

            // String DataStore
            const stringStore = new DataStore<string>();
            stringStore.add("Hallo");
            stringStore.add("Welt");
            stringStore.add("TypeScript");

            // Number DataStore
            const numberStore = new DataStore<number>();
            numberStore.add(1);
            numberStore.add(2);
            numberStore.add(3);

            const output = `Generics Demo:

String Identity: ${identity("Hello TypeScript!")}
Number Identity: ${identity(42)}
Boolean Identity: ${identity(true)}

Generic DataStore:
String Store: ${stringStore.getAll().join(', ')} (${stringStore.count()} Elemente)
Number Store: ${numberStore.getAll().join(', ')} (${numberStore.count()} Elemente)

Generics ermöglichen:
- Typsichere wiederverwendbare Komponenten
- Code-Reduktion ohne Typsicherheit zu verlieren
- Flexibilität bei der Typverwendung`;

            this.displayOutput('generics-output', output);
        } catch (error) {
            this.displayOutput('generics-output', `Fehler: ${error}`, 'error');
        }
    }

    private runUnionsExample(): void {
        try {
            type ID = string | number;
            type Status = 'loading' | 'success' | 'error';

            function processId(id: ID): string {
                if (typeof id === 'string') {
                    return `String ID: ${id.toUpperCase()}`;
                } else {
                    return `Number ID: ${id.toString().padStart(4, '0')}`;
                }
            }

            function getStatusMessage(status: Status): string {
                switch (status) {
                    case 'loading':
                        return 'Laden...';
                    case 'success':
                        return 'Erfolgreich!';
                    case 'error':
                        return 'Fehler aufgetreten';
                    default:
                        // TypeScript erkennt, dass alle Fälle abgedeckt sind
                        return status as never;
                }
            }

            const output = `Union Types Demo:

ID Verarbeitung:
${processId("user123")}
${processId(456)}

Status Nachrichten:
${getStatusMessage('loading')}
${getStatusMessage('success')}
${getStatusMessage('error')}

Union Types bieten:
- Mehrere mögliche Typen für eine Variable
- Type Guards für sichere Typprüfung
- Exhaustive Checking bei Switch-Statements`;

            this.displayOutput('unions-output', output);
        } catch (error) {
            this.displayOutput('unions-output', `Fehler: ${error}`, 'error');
        }
    }

    private runEnumsExample(): void {
        try {
            enum Direction {
                Up,
                Down,
                Left,
                Right
            }

            enum Color {
                Red = '#ff0000',
                Green = '#00ff00',
                Blue = '#0000ff'
            }

            enum HttpStatus {
                OK = 200,
                NotFound = 404,
                ServerError = 500
            }

            function move(direction: Direction): string {
                switch (direction) {
                    case Direction.Up:
                        return 'Nach oben bewegen';
                    case Direction.Down:
                        return 'Nach unten bewegen';
                    case Direction.Left:
                        return 'Nach links bewegen';
                    case Direction.Right:
                        return 'Nach rechts bewegen';
                }
            }

            const output = `Enums Demo:

Bewegungsrichtungen:
${move(Direction.Up)}
${move(Direction.Right)}

Enum-Werte:
Direction.Up = ${Direction.Up}
Direction.Down = ${Direction.Down}

Farben:
Red = ${Color.Red}
Green = ${Color.Green}
Blue = ${Color.Blue}

HTTP Status:
OK = ${HttpStatus.OK}
NotFound = ${HttpStatus.NotFound}
ServerError = ${HttpStatus.ServerError}

Enum-Vorteile:
- Benannte Konstanten
- Bessere Lesbarkeit
- IntelliSense Unterstützung
- Refactoring-Sicherheit`;

            this.displayOutput('enums-output', output);
        } catch (error) {
            this.displayOutput('enums-output', `Fehler: ${error}`, 'error');
        }
    }

    private runFunctionsExample(): void {
        try {
            // Funktionen mit optionalen Parametern
            function greet(name: string, greeting?: string): string {
                return `${greeting || 'Hallo'} ${name}!`;
            }

            // Function Overloads
            function format(value: number): string;
            function format(value: string): string;
            function format(value: boolean): string;
            function format(value: number | string | boolean): string {
                if (typeof value === 'number') {
                    return value.toFixed(2);
                } else if (typeof value === 'boolean') {
                    return value ? 'Ja' : 'Nein';
                } else {
                    return value.toUpperCase();
                }
            }

            // Arrow Function
            const multiply = (a: number, b: number): number => a * b;

            // Higher-Order Function
            const numbers = [1, 2, 3, 4, 5];
            const doubled = numbers.map((n: number): number => n * 2);

            const output = `Functions Demo:

Grußfunktionen:
${greet("Anna")}
${greet("Max", "Guten Morgen")}

Function Overloads:
Number: ${format(3.14159)}
String: ${format("typescript")}
Boolean: ${format(true)}

Arrow Function:
multiply(4, 7) = ${multiply(4, 7)}

Higher-Order Function:
Original: [${numbers.join(', ')}]
Verdoppelt: [${doubled.join(', ')}]

Function-Features:
- Optionale Parameter
- Default-Werte
- Function Overloading
- Type-sichere Callbacks`;

            this.displayOutput('functions-output', output);
        } catch (error) {
            this.displayOutput('functions-output', `Fehler: ${error}`, 'error');
        }
    }

    private runModulesExample(): void {
        try {
            // Simulierte Module (normalerweise separate Dateien)
            
            // math.ts Module
            const MathUtils = {
                add: (a: number, b: number): number => a + b,
                subtract: (a: number, b: number): number => a - b,
                PI: 3.14159
            };

            // Calculator Class
            class Calculator {
                private history: number[] = [];

                calculate(operation: '+' | '-', a: number, b: number): number {
                    let result: number;
                    switch (operation) {
                        case '+':
                            result = MathUtils.add(a, b);
                            break;
                        case '-':
                            result = MathUtils.subtract(a, b);
                            break;
                        default:
                            throw new Error('Unbekannte Operation');
                    }
                    this.history.push(result);
                    return result;
                }

                getHistory(): number[] {
                    return [...this.history];
                }

                clearHistory(): void {
                    this.history = [];
                }
            }

            const calc = new Calculator();
            const result1 = calc.calculate('+', 10, 5);
            const result2 = calc.calculate('-', 20, 8);
            const result3 = calc.calculate('+', 7, 3);
            const history = calc.getHistory();
            calc.clearHistory();

            const output = `Modules Demo:

Berechnungen mit Calculator:
10 + 5 = ${result1}
20 - 8 = ${result2}
7 + 3 = ${result3}

Verlauf: [${history.join(', ')}]

Math Constants:
PI = ${MathUtils.PI}

Module-Vorteile:
- Code-Organisation
- Wiederverwendbarkeit
- Namespace-Trennung
- Lazy Loading
- Tree Shaking Unterstützung

Export/Import Patterns:
- Named Exports: export function add() {}
- Default Exports: export default class Calculator {}
- Namespace Imports: import * as Math from './math'
- Selective Imports: import { add, PI } from './math'`;

            this.displayOutput('modules-output', output);
        } catch (error) {
            this.displayOutput('modules-output', `Fehler: ${error}`, 'error');
        }
    }

    private markLessonComplete(lessonName: string): void {
        const lesson = this.lessons.find(l => l.name === lessonName);
        if (lesson && !lesson.progress) {
            lesson.progress = true;
            this.updateProgress();
        }
    }

    private updateProgress(): void {
        const completedLessons = this.lessons.filter(l => l.progress).length;
        const progressPercentage = (completedLessons / this.lessons.length) * 100;
        
        const progressBar = document.getElementById('progress');
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    // Public method to get app status
    public getStatus(): { currentLesson: string; completedLessons: number; totalLessons: number } {
        return {
            currentLesson: this.currentLesson,
            completedLessons: this.lessons.filter(l => l.progress).length,
            totalLessons: this.lessons.length
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    (window as any).tsLearningApp = new TypeScriptLearningApp();

    console.log('TypeScript Lernanwendung gestartet!');
    console.log('Status:', (window as any).tsLearningApp.getStatus());
    console.log('Verwende window.tsLearningApp.getStatus() für den aktuellen Status.');
});

// Export for module usage
export { TypeScriptLearningApp };