export function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function formatToReais(value){
    return value?.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
}