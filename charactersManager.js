class KwsCharactersManager {
    constructor() {
        this.characters = [];
        this.currentCharacterId = 0;
        this.currentIndex = 0;
    }
    
    setCurrentCharacterId(charId) {
        this.currentCharacterId = charId;
        this.currentIndex = this.characters.findIndex((value) => {
            return value == charId;
        });
        
        // Zabezpieczenie w razie gdyby nie znaleziono ID
        if (this.currentIndex === -1) {
            this.currentIndex = 0;
        }
    }
    
    getNextCharId() {
        if (this.characters.length <= 1) {
            return this.currentCharacterId; 
        }

        var returnCharId;

        if (this.currentIndex >= this.characters.length - 1) {
            returnCharId = this.characters[0];
        } else {
            returnCharId = this.characters[this.currentIndex + 1];
        }

        this.setCurrentCharacterId(returnCharId);
        return returnCharId;
    }
    
    getPreviousCharId() {
        if (this.characters.length <= 1) {
            return this.currentCharacterId;
        }

        var returnCharId;

        if (this.currentIndex <= 0) {
            returnCharId = this.characters[this.characters.length - 1];
        } else {
            returnCharId = this.characters[this.currentIndex - 1];
        }

        this.setCurrentCharacterId(returnCharId);
        return returnCharId;
    }
}

// 1. Inicjalizacja instancji od razu, aby obiekt nie był 'undefined'
var kwsLocalCharacters = new KwsCharactersManager();

function getCharacters() {
    // Sprawdzamy czy gra i elementy są załadowane
    if (typeof GAME === 'undefined' || $("li[data-option=select_char]").length === 0) {
        setTimeout(getCharacters, 200);
        return;
    }

    var allCharacters = [...$("li[data-option=select_char]")];
    
    // Czyścimy i wypełniamy istniejący obiekt danymi
    kwsLocalCharacters.characters = allCharacters.map(element => element.getAttribute("data-char_id"));
    
    // Opcjonalnie: ustawiamy pierwszy element jako aktywny jeśli nie jest ustawiony
    if (kwsLocalCharacters.characters.length > 0 && !kwsLocalCharacters.currentCharacterId) {
        kwsLocalCharacters.setCurrentCharacterId(kwsLocalCharacters.characters[0]);
    }
}

// Uruchomienie pobierania
getCharacters();