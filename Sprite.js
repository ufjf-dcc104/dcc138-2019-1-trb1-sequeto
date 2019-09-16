function Sprite(params = {}) {
    var exemplo = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        h: 10,
        w: 10,
        props: {},
        color: "blue",
        atirando: 0,
        comportar: undefined,
        scene: undefined
    }

    Object.assign(this, exemplo, params);
}

Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
}

Sprite.prototype.mover = function (dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;

    if (this.atirando > 0) {
        this.atirando = this.atirando - dt;
    }
}

Sprite.prototype.desenhaTela = function (ctx) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillStyle = "tan";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

Sprite.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w < this.x)
        return false;
    if (alvo.x > this.x + this.w)
        return false;
    if (alvo.y + alvo.w < this.y)
        return false;
    if (alvo.y > this.y + this.w)
        return false;

    return true;
}

Sprite.prototype.pontuacao = function (pontos, ctx) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.font = "19px bold monospaced";
    ctx.fillText(pontos, 10, 290);
    ctx.strokeText(pontos, 10, 290);
}