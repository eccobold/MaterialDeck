import {dnd5e} from "./dnd5e.js"
import {dnd35e} from "./dnd35e.js"
import {pf2e} from "./pf2e.js"
import {demonlord} from "./demonlord.js";
import {compatibleCore} from "../misc.js";

export class TokenHelper{
    constructor(){
        this.system;
        this.setSystem();
    }

    setSystem() {
        if (game.system.id == 'D35E' || game.system.id == 'pf1') this.system = new dnd35e();
        else if (game.system.id == 'pf2e') this.system = new pf2e();
        else if (game.system.id == 'demonlord') this.system = new demonlord();
        else this.system = new dnd5e();     //default to dnd5e
    }

    /***********************************************************************
     * System agnostic functions
     ***********************************************************************/
    getToken(type,identifier) {
        if (type == 'selected') return this.getSelectedToken();
        else if (type != 'selected' && identifier == '') return;
        else if (type == 'tokenName') return this.getTokenFromTokenName(identifier);
        else if (type == 'actorName') return this.getTokenFromActorName(identifier);
        else if (type == 'tokenId') return this.getTokenFromTokenId(identifier);
        else if (type == 'actorId') return this.getTokenFromActorId(identifier);
    }
    getTokenFromTokenId(id) {
        return canvas.tokens.children[0].children.find(p => p.id == id);
    }

    getTokenFromTokenName(name) {
        return canvas.tokens.children[0].children.find(p => p.name == name);
    }

    getTokenFromActorId(id) {
        return canvas.tokens.children[0].children.find(p => p.actor.id == id);
    }

    getTokenFromActorName(name) {
        return canvas.tokens.children[0].children.find(p => p.actor.name == name);
    }

    getSelectedToken() {
        return canvas.tokens.controlled[0];
    }

    moveToken(token,dir){
        if (dir == undefined) dir = 'up';
        const gridSize = canvas.scene.data.grid;
        let x = token.x;
        let y = token.y;

        if (dir == 'up') y -= gridSize;
        else if (dir == 'down') y += gridSize;
        else if (dir == 'right') x += gridSize;
        else if (dir == 'left') x -= gridSize;
        else if (dir == 'upRight') {
            x += gridSize;
            y -= gridSize;
        }
        else if (dir == 'upLeft') {
            x -= gridSize;
            y -= gridSize;
        }
        else if (dir == 'downRight') {
            x += gridSize;
            y += gridSize;
        }
        else if (dir == 'downLeft') {
            x -= gridSize;
            y += gridSize;
        }
        else if (dir == 'center') {
            let location = token.getCenter(x,y); 
            canvas.animatePan(location);
        }
        if (game.user.isGM == false && game.paused == true && (token.can(game.user,"control") == false || token.checkCollision(token.getCenter(x, y)))) return;
        if (compatibleCore("0.8.1")) token.document.update({x:x,y:y});
        else token.update({x:x,y:y});
    };

    rotateToken(token,move,value) {
        if (move == undefined) move = 'to';
        value = isNaN(parseInt(value)) ? 0 : parseInt(value);

        let rotationVal;
        if (move == 'by') rotationVal = token.data.rotation + value;
        else rotationVal = value;
        
        if (compatibleCore("0.8.1")) token.document.update({rotation: rotationVal});
        else token.update({rotation: rotationVal});
    }

    ///////////////////////////////////////////////

    /**
     * Get name/id
     */
    getTokenName(token) {
        return token.name;
    }

    getTokenId(token) {
        return token.id;
    }

    getActorName(token) {
        return token.actor.name;
    }

    getActorId(token) {
        return token.actor.id;
    }

    ////////////////////////////////////////////////////
    getTokenIcon(token) {
        return token.data.img;
    }

    getActorIcon(token) {
        return token.actor.data.img;
    }

    /***********************************************************************
     * System agnostic functions
     ***********************************************************************/
    getHP(token) {
        return this.system.getHP(token);
    }

    getTempHP(token) {
        return this.system.getTempHP(token);
    }

    getAC(token) {
        return this.system.getAC(token);
    }

    getShieldHP(token) {
        return this.system.getShieldHP(token);
    }

    getSpeed(token) {
        return this.system.getSpeed(token);
    }

    getInitiative(token) {
        return this.system.getInitiative(token);
    }

    toggleInitiative(token) {
        return this.system.toggleInitiative(token);
    }

    getPassivePerception(token) {
        return this.system.getPassivePerception(token);
    }

    getPassiveInvestigation(token) {
        return this.system.getPassiveInvestigation(token);
    }

    getAbility(token, ability) {
        return this.system.getAbility(token, ability);
    }

    getAbilityModifier(token, ability) {
        return this.system.getAbilityModifier(token, ability);
    }

    getAbilitySave(token, ability) {
        return this.system.getAbilitySave(token, ability);
    }

    getSkill(token, skill) {
        return this.system.getSkill(token, skill);
    }

    getProficiency(token) {
        return this.system.getProficiency(token);
    }

    /**
     * Conditions
     */
    getConditionIcon(condition) {
        return this.system.getConditionIcon(condition);
    }

    getConditionActive(token,condition) {
        return this.system.getConditionActive(token,condition);
    }

    toggleCondition(token,condition) {
        return this.system.toggleCondition(token,condition);
    }

    /**
     * Roll
     */
     roll(token,roll,options,ability,skill,save) {
        return this.system.roll(token,roll,options,ability,skill,save);
    }

    /**
     * Items
     */
    getItems(token,itemType) {
        return this.system.getItems(token,itemType);
    }

    getItemUses(item) {
        return this.system.getItemUses(item);
    }

    /**
     * Features
     */
    getFeatures(token,featureType) {
        return this.system.getFeatures(token,featureType);
    }

    getFeatureUses(item) {
        return this.system.getFeatureUses(item);
    }

    /**
     * Spells
     */
     getSpells(token,level) {
        return this.system.getSpells(token,level);
    }

    getSpellUses(token,level,item) {
        return this.system.getSpellUses(token,level,item);
    }
}