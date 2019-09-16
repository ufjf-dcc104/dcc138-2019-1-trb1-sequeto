function Scene(params) {
    var exemplo = {
        sprites: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        pontos: 0,
        contador: 0
    }

    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.adicionar = function (sprite) {
    this.sprites.push(sprite);
    sprite.scene = this;
}

Scene.prototype.desenhaCenario = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].desenhaTela(this.ctx);
    }
}

Scene.prototype.desenhar = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].desenhar(this.ctx);
    }
}

Scene.prototype.mover = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].mover(dt);
    }
}

Scene.prototype.comportar = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].comportar) {
            this.sprites[i].comportar();
        }
    }
}

Scene.prototype.limpar = function () {
    this.ctx.clearRect(0, 0, this.w, this.h);
}

Scene.prototype.removeSprites = function () {
    for (var i = 0; i < this.toRemove.length; i++) {
        var idx = this.sprites.indexOf(this.toRemove[i]);
        if (idx >= 0) {
            this.sprites.splice(idx, 1);
        }
    }
    this.toRemove = [];
};

Scene.prototype.checaColisao = function(){
    for(var i = 0; i<this.sprites.length; i++){
        for(var j = i+1; j<this.sprites.length; j++){
            if(this.sprites[i].colidiuCom(this.sprites[j])){
                if(this.sprites[i].props.tipo === "npc" && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[i]);
                    this.toRemove.push(this.sprites[j]);
                    this.pontos++;
                }
            }
        }
    }  
};

Scene.prototype.checaColisaoNemesis = function(){
    for(var i = 0; i<this.sprites.length; i++){
        for(var j = i+1; j<this.sprites.length; j++){
            if(this.sprites[i].colidiuCom(this.sprites[j])){
                if(this.sprites[i].props.tipo === "nemesis" && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[j]);
                    this.contador++;

                    if(this.contador === 4){
                        this.toRemove.push(this.sprites[i]);
                        this.toRemove.push(this.sprites[j]);
                        this.pontos++;
                        this.contador = 0;
                    }
                }
            }
        }
    }  
};


Scene.prototype.pontuacao = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].pontuacao(this.pontos,this.ctx);
    }
};

Scene.prototype.passo = function () {
    this.limpar();
    this.desenhaCenario();
    this.comportar();
    this.mover(dt);
    this.desenhar();
    this.checaColisao();
    this.checaColisaoNemesis();
    this.pontuacao();
    this.removeSprites();
}