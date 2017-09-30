const elements = {
    void: {
        red: 0, green: 0, blue: 0,
        density: 0, gravity: 0, slip: 0, slide: 0, scatter: 0,
        reactions: [],
        selfReactions: [],
    },
    wall: {
        red: 0.5, green: 0.5, blue: 0.5,
        density: 1, gravity: 0, slip: 0, slide: 0, scatter: 0,
        immobile: true,
        reactions: [],
        selfReactions: [],
    },
    sand: {
        red: 1.0, green: 0.8, blue: 0.2,
        density: 0.7, gravity: 0.8, slip: 0, slide: 0.8, scatter: 0,
        reactions: [],
        selfReactions: [],
    },
    salt: {
        red: 0.8, green: 0.8, blue: 0.8,
        density: 0.6, gravity: 0.75, slip: 0.05, slide: 0.7, scatter: 0,
        reactions: [],
        selfReactions: [],
    },
    water: {
        red: 0, green: 0.4, blue: 1,
        density: 0.5, gravity: 0.8, slip: 0.95, slide: 0, scatter: 0.35,
        reactions: [],
        selfReactions: [],
    },
    plant: {
        red: 0.2, green: 0.8, blue: 0,
        density: 1, gravity: 0, slip: 0, slide: 0, scatter: 0,
        immobile: true,
        reactions: [],
        selfReactions: [],
    },
    fire: {
        red: 0.9, green: 0.2, blue: 0.1,
        density: -0.5, gravity: -0.2, slip: 0, slide: 0, scatter: 0.8,
        reactions: [],
        selfReactions: [],
    },
    oil: {
        red: 0.6, green: 0.4, blue: 0.15,
        density: 0.4, gravity: 0.75, slip: 0.75, slide: 0, scatter: 0.2,
        reactions: [],
        selfReactions: [],
    },
    nitro: {
        red: 0.1, green: 0.5, blue: 0,
        density: 0.3, gravity: 0.9, slip: 0.5, slide: 0, scatter: 0,
        reactions: [],
        selfReactions: [],
    },
    spout: {
        red: 0.5, green: 0.7, blue: 1.0,
        density: 1, gravity: 0, slip: 0, slide: 0, scatter: 0,
        immobile: true,
        reactions: [],
        selfReactions: [],
    },
    torch: {
        red: 0.4, green: 0.1, blue: 0,
        density: 1, gravity: 0, slip: 0, slide: 0, scatter: 0,
        immobile: true,
        reactions: [],
        selfReactions: [],
    },
    well: {
        red: 0.5, green: 0.3, blue: 0,
        density: 1, gravity: 0, slip: 0, slide: 0, scatter: 0,
        immobile: true,
        reactions: [],
        selfReactions: [],
    },
    saltwater: {
        red: 0.1, green: 0.45, blue: 1,
        density: 0.51, gravity: 0.8, slip: 0.95, slide: 0, scatter: 0.25,
        hidden: true,
        reactions: [],
        selfReactions: [],
    },
    steam: {
        red: 0.3, green: 0.65, blue: 0.8,
        density: -0.2, gravity: -0.2, slip: 0, slide: 0, scatter: 0.4,
        hidden: true,
        reactions: [],
        selfReactions: [],
    },
    glass: {
        red: 0.9, green: 0.92, blue: 0.92,
        density: 1, gravity: 0, slip: 0, slide: 0, scatter: 0,
        immobile: true,
        hidden: true,
        reactions: [],
        selfReactions: [],
    },
};

let elementId = 0;
for(const elementName in elements){
    elements[elementName].id = elementId++;
}

elements.fire.selfReactions.push({
    chance: 0.2,
    becomes: elements.void,
});

elements.fire.reactions.push({
    chance: 0.75,
    becomes: elements.void,
    singleNeighbor: {
        element: elements.void,
        becomes: elements.fire,
        minimum: 1,
        maximum: 6,
        affects: 1,
    },
});

elements.fire.reactions.push({
    chance: 0.85,
    becomes: elements.void,
    singleNeighbor: {
        element: elements.water,
        becomes: elements.steam,
        minimum: 1,
        maximum: 8,
        affects: 4,
    },
});

elements.fire.reactions.push({
    chance: 0.85,
    becomes: elements.fire,
    singleNeighbor: {
        element: elements.plant,
        becomes: elements.fire,
        minimum: 1,
        maximum: 8,
        affects: 4,
    },
});

elements.fire.reactions.push({
    chance: 0.98,
    becomes: elements.fire,
    singleNeighbor: {
        element: elements.oil,
        becomes: elements.fire,
        minimum: 1,
        maximum: 8,
        affects: 5,
    },
});

elements.fire.reactions.push({
    chance: 0.25,
    explosive: 2,
    becomes: elements.fire,
    singleNeighbor: {
        element: elements.nitro,
        becomes: elements.fire,
        minimum: 1,
        maximum: 8,
        affects: 1,
    },
});

elements.fire.reactions.push({
    chance: 0.9,
    explosive: 2,
    becomes: elements.fire,
    singleNeighbor: {
        element: elements.nitro,
        becomes: elements.fire,
        minimum: 1,
        maximum: 8,
        affects: 2,
    },
});

elements.sand.reactions.push({
    chance: 0.45,
    becomes: elements.glass,
    singleNeighbor: {
        element: elements.fire,
        becomes: elements.fire,
        minimum: 2,
        maximum: 8,
        affects: 0,
    },
});

elements.plant.reactions.push({
    chance: 0.007,
    becomes: elements.plant,
    singleNeighbor: {
        element: elements.water,
        becomes: elements.plant,
        minimum: 1,
        maximum: 8,
        affects: 2,
    },
});

elements.plant.reactions.push({
    chance: 0.025,
    becomes: elements.plant,
    singleNeighbor: {
        element: elements.water,
        becomes: elements.void,
        minimum: 1,
        maximum: 8,
        affects: 2,
    },
});

elements.plant.reactions.push({
    chance: 0.2,
    becomes: elements.plant,
    multiNeighbor: [
        {
            element: elements.water,
            becomes: elements.plant,
            minimum: 1,
            maximum: 8,
            affects: 1,
        },
        {
            element: elements.plant,
            becomes: elements.plant,
            minimum: 0,
            maximum: 2,
            affects: 0,
        },
    ],
});

elements.plant.reactions.push({
    chance: 0.2,
    becomes: elements.plant,
    multiNeighbor: [
        {
            element: elements.water,
            becomes: elements.plant,
            minimum: 1,
            maximum: 8,
            affects: 1,
        },
        {
            element: elements.plant,
            becomes: elements.plant,
            minimum: 0,
            maximum: 4,
            affects: 0,
        },
    ],
});

elements.water.reactions.push({
    chance: 0.95,
    becomes: elements.saltwater,
    singleNeighbor: {
        element: elements.salt,
        becomes: elements.void,
        minimum: 1,
        maximum: 8,
        affects: 1,
    },
});

elements.saltwater.reactions.push({
    chance: 0.85,
    becomes: elements.salt,
    singleNeighbor: {
        element: elements.fire,
        becomes: elements.steam,
        minimum: 1,
        maximum: 8,
        affects: 1,
    },
});

elements.steam.selfReactions.push({
    chance: 0.008,
    becomes: elements.water,
});

elements.steam.reactions.push({
    chance: 0.8,
    becomes: elements.water,
    singleNeighbor: {
        element: elements.steam,
        becomes: elements.water,
        minimum: 3,
        maximum: 8,
        affects: 2,
    },
});

elements.steam.reactions.push({
    chance: 0.05,
    becomes: elements.void,
    singleNeighbor: {
        element: elements.void,
        becomes: elements.steam,
        minimum: 1,
        maximum: 8,
        affects: 1,
    },
});

elements.torch.reactions.push({
    chance: 0.75,
    becomes: elements.torch,
    singleNeighbor: {
        element: elements.void,
        becomes: elements.fire,
        minimum: 1,
        maximum: 8,
        affects: 2,
    },
});

elements.torch.reactions.push({
    chance: 0.4,
    becomes: elements.torch,
    singleNeighbor: {
        element: elements.water,
        becomes: elements.steam,
        minimum: 1,
        maximum: 8,
        affects: 1,
    },
});

elements.torch.reactions.push({
    chance: 0.2,
    becomes: elements.torch,
    singleNeighbor: {
        element: elements.oil,
        becomes: elements.fire,
        minimum: 1,
        maximum: 8,
        affects: 2,
    },
});

elements.torch.reactions.push({
    chance: 0.4,
    becomes: elements.torch,
    singleNeighbor: {
        element: elements.nitro,
        becomes: elements.fire,
        minimum: 1,
        maximum: 8,
        affects: 3,
    },
});

elements.spout.reactions.push({
    chance: 0.12,
    becomes: elements.spout,
    singleNeighbor: {
        element: elements.void,
        becomes: elements.water,
        minimum: 1,
        maximum: 8,
        affects: 1,
    },
});

elements.well.reactions.push({
    chance: 0.13,
    becomes: elements.well,
    singleNeighbor: {
        element: elements.void,
        becomes: elements.oil,
        minimum: 1,
        maximum: 7,
        affects: 1,
    },
});

const defaultElement = elements.void;

function shuffleArray(array){
    const newArray = [];
    let i = 0;
    for(const element of array){
        let j = Math.floor(Math.random() * i);
        if(i === j){
            newArray.push(element);
        }else{
            newArray.push(newArray[j]);
            newArray[j] = element;
        }
        i++;
    }
    return newArray;
}

function rgb2hex(red, green, blue){
    return "#" + (
        ("0" + Math.floor(red * 255).toString(16)).slice(-2) +
        ("0" + Math.floor(green * 255).toString(16)).slice(-2) +
        ("0" + Math.floor(blue * 255).toString(16)).slice(-2)
    );
}

function nextPow2(n){
    return Math.pow(2, Math.ceil(Math.log2(n)));
}

function newBuffer(width, height, fill){
    const buffer = [];
    buffer.width = width;
    buffer.height = height;
    for(let i = 0; i < width * height; i++){
        buffer.push(fill);
    }
    return buffer;
}

function newTexture(gl, pixels){
    return twgl.createTexture(gl, {
        target: gl.TEXTURE_2D,
        width: pixels.width,
        height: pixels.height,
        minMag: gl.NEAREST,
        internalFormat: gl.RGB,
        format: gl.RGB,
        wrap: gl.CLAMP_TO_EDGE,
        src: pixels,
    });
}

function newPixelData(buffer){
    const textureWidth = nextPow2(buffer.width);
    const textureHeight = nextPow2(buffer.height);
    const pixels = new Uint8Array(textureWidth * textureHeight * 3);
    pixels.width = textureWidth;
    pixels.height = textureHeight;
    return blitPixelData(pixels, buffer);
}

function blitPixelData(pixels, buffer){
    let j = 0;
    for(let i = 0; i < buffer.length; i++){
        pixels[j++] = Math.floor(buffer[i].red * 255);
        pixels[j++] = Math.floor(buffer[i].green * 255);
        pixels[j++] = Math.floor(buffer[i].blue * 255);
        if(i % buffer.width === buffer.width - 1){
            j += (pixels.width - buffer.width) * 3;
        }
    }
    return pixels;
}

function updateBuffers(timestamp, timeBuffer, readBuffer, writeBuffer){
    const allNeighbors = [
        -readBuffer.width - 1,
        -readBuffer.width,
        -readBuffer.width + 1,
        -1,
        +1,
        +readBuffer.width - 1,
        +readBuffer.width,
        +readBuffer.width + 1,
    ];
    const westEdgeNeighbors = [
        -readBuffer.width,
        -readBuffer.width + 1,
        +1,
        +readBuffer.width,
        +readBuffer.width + 1,
    ];
    const eastEdgeNeighbors = [
        -readBuffer.width - 1,
        -readBuffer.width,
        -1,
        +readBuffer.width - 1,
        +readBuffer.width,
    ];
    allNeighbors.randomOrder = [
        shuffleArray(allNeighbors),
        shuffleArray(allNeighbors),
        shuffleArray(allNeighbors),
        shuffleArray(allNeighbors),
        shuffleArray(allNeighbors),
        shuffleArray(allNeighbors),
    ];
    westEdgeNeighbors.randomOrder = [
        shuffleArray(westEdgeNeighbors),
        shuffleArray(westEdgeNeighbors),
        shuffleArray(westEdgeNeighbors),
        shuffleArray(westEdgeNeighbors),
        shuffleArray(westEdgeNeighbors),
        shuffleArray(westEdgeNeighbors),
    ];
    eastEdgeNeighbors.randomOrder = [
        shuffleArray(eastEdgeNeighbors),
        shuffleArray(eastEdgeNeighbors),
        shuffleArray(eastEdgeNeighbors),
        shuffleArray(eastEdgeNeighbors),
        shuffleArray(eastEdgeNeighbors),
        shuffleArray(eastEdgeNeighbors),
    ];
    let neighborOrderIndex = 0;
    const mode = timestamp % 2;
    const increment = mode ? -1 : +1;
    const totalCells = readBuffer.width * readBuffer.height;
    let i = mode * (totalCells - 1);
    let west = i - 1;
    let east = i + 1;
    let north = i - readBuffer.width;
    let south = i + readBuffer.width;
    // for(let j = 0; j < readBuffer.length; j++){
    //     writeBuffer[j] = readBuffer[j];
    // }
    while(i >= 0 && i < totalCells){
        let random = Math.random();
        if(timeBuffer[i] === timestamp){
            i += increment;
            north += increment;
            south += increment;
            east += increment;
            west += increment;
            continue;
        };
        const cell = readBuffer[i];
        const northwest = north - 1;
        const northeast = north + 1;
        const southwest = south - 1;
        const southeast = south + 1;
        const inRow = i % readBuffer.width;
        const westEdge = inRow === 0;
        const eastEdge = inRow === readBuffer.width - 1;
        const slipRandom = Math.random();
        if(cell.gravity > 0 && south < totalCells &&
            !readBuffer[south].immobile &&
            cell.density > readBuffer[south].density
        ){
            if(timeBuffer[south] < timestamp && cell.gravity > random){
                writeBuffer[i] = readBuffer[south];
                writeBuffer[south] = cell;
                timeBuffer[i] = timestamp;
                timeBuffer[south] = timestamp;
            }
            random = Math.random();
        }else if(cell.gravity < 0 && north >= 0 &&
            !readBuffer[north].immobile &&
            cell.density < readBuffer[north].density
        ){
            if(timeBuffer[north] < timestamp && cell.gravity < -random){
                writeBuffer[i] = readBuffer[north];
                writeBuffer[north] = cell;
                timeBuffer[i] = timestamp;
                timeBuffer[north] = timestamp;
            }
            random = Math.random();
        }else if(cell.gravity && cell.slide > random){
            const westStep = cell.gravity > 0 ? southwest : northwest;
            const eastStep = cell.gravity > 0 ? southeast : northeast;
            const westAllowed = !westEdge && (
                westStep >= 0 && westStep < totalCells &&
                !readBuffer[westStep].immobile && (cell.gravity > 0 ?
                    cell.density > readBuffer[westStep].density :
                    cell.density < readBuffer[westStep].density
                )
            );
            const eastAllowed = !eastEdge && (
                eastStep >= 0 && eastStep < totalCells &&
                !readBuffer[eastStep].immobile && (cell.gravity > 0 ?
                    cell.density > readBuffer[eastStep].density :
                    cell.density < readBuffer[eastStep].density
                )
            );
            if(westAllowed && (!eastAllowed || Math.random() < 0.5)){
                writeBuffer[i] = readBuffer[westStep];
                writeBuffer[westStep] = cell;
                timeBuffer[i] = timestamp;
                timeBuffer[westStep] = timestamp;
            }else if(eastAllowed){
                writeBuffer[i] = readBuffer[eastStep];
                writeBuffer[eastStep] = cell;
                timeBuffer[i] = timestamp;
                timeBuffer[eastStep] = timestamp;
            }
            random = Math.random();
        }else if(cell.slip > slipRandom && (
            (cell.gravity > 0 && south < totalCells && timeBuffer[south] < timestamp - 2) ||
            (cell.gravity < 0 && north >= 0 && timeBuffer[north] < timestamp - 2)
        )){
            const westBound = i - (i % readBuffer.width);
            const eastBound = westBound + readBuffer.width - 1;
            let westCell = i;
            let eastCell = i;
            let westStep = cell.gravity > 0 ? south : north;
            let eastStep = westStep;
            let westUnder = westStep + readBuffer.width;
            let eastUnder = westUnder;
            let westOpen = false;
            let eastOpen = false;
            let lastWest = 0;
            let lastEast = 0;
            if(cell.gravity > 0){
                while(westCell > westBound && westStep < totalCells - 1){
                    westCell--; westStep--; westUnder--;
                    if(
                        readBuffer[westCell].immobile ||
                        cell.density < readBuffer[westCell].density
                    ) break;
                    if(
                        !readBuffer[westStep].immobile &&
                        cell.density > readBuffer[westStep].density
                    ){
                        if(timeBuffer[westStep] < timestamp){
                            westOpen = true;
                            lastWest = westStep;
                        }
                        if(Math.random() < 0.25 || (
                            westUnder < totalCells &&
                            !readBuffer[westUnder].immobile && 
                            cell.density > readBuffer[westUnder].density
                        )) break;
                    }
                }
                while(eastCell < eastBound && eastStep < totalCells - 1){
                    eastCell++; eastStep++; eastUnder++;
                    if(
                        readBuffer[eastCell].immobile ||
                        cell.density < readBuffer[eastCell].density
                    ) break;
                    if(
                        !readBuffer[eastStep].immobile &&
                        cell.density > readBuffer[eastStep].density
                    ){
                        if(timeBuffer[eastStep] < timestamp){
                            eastOpen = true;
                            lastEast = eastStep;
                        }
                        if(Math.random() < 0.25 || (
                            eastUnder < totalCells &&
                            !readBuffer[eastUnder].immobile && 
                            cell.density > readBuffer[eastUnder].density
                        )) break;
                    }
                }
            }else{
                // TODO
            }
            let swapTarget;
            if(westOpen && eastOpen){
                swapTarget = Math.random() < 0.5 ? lastWest : lastEast;
            }else if(westOpen){
                swapTarget = lastWest;
            }else if(eastOpen){
                swapTarget = lastEast;
            }
            if(swapTarget !== undefined){
                writeBuffer[i] = readBuffer[swapTarget];
                writeBuffer[swapTarget] = cell;
                timeBuffer[i] = timestamp;
                timeBuffer[swapTarget] = timestamp;
            }
            random = Math.random();
        }else if(cell.scatter > random){
            const westAllowed = !westEdge && (
                timeBuffer[west] < timestamp &&
                !readBuffer[west].immobile && (cell.gravity > 0 ?
                    cell.density >= readBuffer[west].density :
                    cell.density <= readBuffer[west].density
                )
            );
            const eastAllowed = !eastEdge && (
                timeBuffer[east] < timestamp &&
                !readBuffer[east].immobile && (cell.gravity > 0 ?
                    cell.density >= readBuffer[east].density :
                    cell.density <= readBuffer[east].density
                )
            );
            if(westAllowed && (!eastAllowed || Math.random() < 0.5)){
                writeBuffer[i] = readBuffer[west];
                writeBuffer[west] = cell;
                timeBuffer[i] = timestamp;
                timeBuffer[west] = timestamp;
            }else if(eastAllowed){
                writeBuffer[i] = readBuffer[east];
                writeBuffer[east] = cell;
                timeBuffer[i] = timestamp;
                timeBuffer[east] = timestamp;
            }
            random = Math.random();
        }
        if(timeBuffer[i] < timestamp){
            writeBuffer[i] = readBuffer[i];
            if(cell.reactions.length){
                const neighbors = [];
                if(north >= 0) neighbors[readBuffer[north].id] = (
                    (neighbors[readBuffer[north].id] || 0) + 1
                );
                if(south < totalCells) neighbors[readBuffer[south].id] = (
                    (neighbors[readBuffer[south].id] || 0) + 1
                );
                if(!westEdge){
                    if(northwest >= 0) neighbors[readBuffer[northwest].id] = (
                        (neighbors[readBuffer[northwest].id] || 0) + 1
                    );
                    if(west >= 0) neighbors[readBuffer[west].id] = (
                        (neighbors[readBuffer[west].id] || 0) + 1
                    );
                    if(southwest < totalCells) neighbors[readBuffer[southwest].id] = (
                        (neighbors[readBuffer[southwest].id] || 0) + 1
                    );
                }
                if(!eastEdge){
                    if(northeast >= 0) neighbors[readBuffer[northeast].id] = (
                        (neighbors[readBuffer[northeast].id] || 0) + 1
                    );
                    if(southeast < totalCells) neighbors[readBuffer[southeast].id] = (
                        (neighbors[readBuffer[southeast].id] || 0) + 1
                    );
                    if(east < totalCells) neighbors[readBuffer[east].id] = (
                        (neighbors[readBuffer[east].id] || 0) + 1
                    );
                }
                for(const reaction of cell.reactions){
                    if(reaction.singleNeighbor && reaction.chance > random){
                        const actual = neighbors[reaction.singleNeighbor.element.id];
                        if(
                            actual >= reaction.singleNeighbor.minimum &&
                            actual <= reaction.singleNeighbor.maximum
                        ){
                            writeBuffer[i] = reaction.becomes;
                            timeBuffer[i] = timestamp;
                            if(reaction.explosive){
                                let expWest = west;
                                let expEast = east;
                                let expNorth = north;
                                let expSouth = south;
                                for(let exp = 0; exp <= reaction.explosive; exp++){
                                    if(expWest >= 0 && !westEdge){
                                        writeBuffer[expWest] = reaction.becomes;
                                        timeBuffer[expWest] = timestamp;
                                        if(expWest % readBuffer.width === 0) break;
                                        expWest--;
                                    }
                                    if(expEast < totalCells && !eastEdge){
                                        writeBuffer[expEast] = reaction.becomes;
                                        timeBuffer[expEast] = timestamp;
                                        if(expEast % readBuffer.width === readBuffer.width - 1) break;
                                        expEast++;
                                    }
                                    if(expNorth >= 0){
                                        writeBuffer[expNorth] = reaction.becomes;
                                        timeBuffer[expNorth] = timestamp;
                                        expNorth -= readBuffer.width;
                                    }
                                    if(expSouth < totalCells){
                                        writeBuffer[expSouth] = reaction.becomes;
                                        timeBuffer[expSouth] = timestamp;
                                        expSouth += readBuffer.height;
                                    }
                                }
                            }else{
                                const whichNeighbors = (westEdge ?
                                    westEdgeNeighbors : (eastEdge ? eastEdgeNeighbors : allNeighbors)
                                );
                                const neighborIndexes = whichNeighbors.randomOrder[neighborOrderIndex++];
                                if(neighborOrderIndex >= whichNeighbors.randomOrder.length){
                                    neighborOrderIndex = 0;
                                }
                                let changed = 0;
                                for(let j = 0; j < 8 && changed < reaction.singleNeighbor.affects; j++){
                                    const index = i + neighborIndexes[j];
                                    if(
                                        index >= 0 && index < readBuffer.length &&
                                        readBuffer[index] === reaction.singleNeighbor.element
                                    ){
                                        writeBuffer[index] = reaction.singleNeighbor.becomes;
                                        timeBuffer[index] = timestamp;
                                        changed++;
                                    }
                                }
                                break;
                            }
                        }
                    }else if(reaction.multiNeighbor && reaction.chance > random){
                        let match = true;
                        for(const thisNeighbor of reaction.multiNeighbor){
                            const actual = neighbors[thisNeighbor.element.id];
                            if(
                                actual < thisNeighbor.minimum ||
                                actual > thisNeighbor.maximum
                            ){
                                match = false;
                                break;
                            }
                        }
                        if(match) for(const thisNeighbor of reaction.multiNeighbor){
                            writeBuffer[i] = reaction.becomes;
                            timeBuffer[i] = timestamp;
                            const whichNeighbors = (westEdge ?
                                westEdgeNeighbors : (eastEdge ? eastEdgeNeighbors : allNeighbors)
                            );
                            const neighborIndexes = whichNeighbors.randomOrder[neighborOrderIndex++];
                            if(neighborOrderIndex >= whichNeighbors.randomOrder.length){
                                neighborOrderIndex = 0;
                            }
                            let changed = 0;
                            for(let j = 0; j < 8 && changed < thisNeighbor.affects; j++){
                                const index = i + neighborIndexes[j];
                                if(
                                    index >= 0 && index < readBuffer.length &&
                                    readBuffer[index] === thisNeighbor.element
                                ){
                                    writeBuffer[index] = thisNeighbor.becomes;
                                    timeBuffer[index] = timestamp;
                                    changed++;
                                }
                            }
                            break;
                        }
                    }
                    random = Math.random()
                }
            }
            if(cell.selfReactions.length && timeBuffer[i] < timestamp){
                for(const reaction of cell.selfReactions){
                    if(reaction.chance > random){
                        writeBuffer[i] = reaction.becomes;
                        timeBuffer[i] = timestamp;
                    }
                    random = Math.random();
                }
            }
        }
        i += increment;
        north += increment;
        south += increment;
        east += increment;
        west += increment;
    }
}

const vertexShader = `
    precision mediump float;
    attribute vec2 a_position;
    varying vec2 v_position;
    void main(){
        v_position = a_position;
        gl_Position = vec4(
            a_position.x * 2.0 - 1.0, v_position.y * -2.0 + 1.0, 0.0, 1.0
        );
    }
`;

const fragmentShader = `
    precision mediump float;
    uniform sampler2D u_texture;
    varying vec2 v_position;
    void main(){
        gl_FragColor = texture2D(u_texture, v_position);
    }
`;

function begin(){
    const canvas = document.getElementById("glCanvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const gl = twgl.getWebGLContext(canvas, {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
    });
    twgl.setDefaults({
        textureColor: [0, 0, 0, 1],
        attribPrefix: "a_",
    });
    
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 1);
    
    const bufferWidth = 128;
    const bufferHeight = 128;
    
    let currentBuffer = newBuffer(bufferWidth, bufferHeight, defaultElement);
    let reserveBuffer = newBuffer(bufferWidth, bufferHeight, defaultElement);
    const timeBuffer = newBuffer(bufferWidth, bufferHeight, 0);
    
    const pixels = newPixelData(currentBuffer);
    const texture = newTexture(gl, pixels);
    
    const programInfo = twgl.createProgramInfo(gl, [
        vertexShader, fragmentShader,
    ]);
    gl.useProgram(programInfo.program);
    twgl.setUniforms(programInfo, {
        u_texture: texture,
    });
    
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, {
        position: {
            numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1]
        },
    });
    
    let frame = 1;
    
    // http://stackoverflow.com/questions/381795/how-to-disable-right-click-context-menu-in-javascript
    canvas.addEventListener("contextmenu", function(event){
        if(event.preventDefault) event.preventDefault();
        if(event.stopPropagation) event.stopPropagation();
        return false;
    });
    
    let drawing = false;
    let selectedElement = elements.wall;
    
    let lastMouseEvent = undefined;
    function drawAtMouse(event){
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        if(x >= 0 && y >= 0 && x < 1 && y < 1){
            const i = Math.floor(x * bufferWidth);
            const j = Math.floor(y * bufferHeight);
            for(let brushX = -2; brushX < 2; brushX++){
                for(let brushY = -2; brushY < 2; brushY++){
                    const drawX = i + brushX;
                    const drawY = j + brushY;
                    if(drawX >= 0 && drawY >= 0 && drawX < bufferWidth && drawY < bufferHeight){
                        currentBuffer[drawX + drawY * bufferWidth] = selectedElement;
                    }
                }
            }
        }
    }
    
    canvas.addEventListener("mousedown", function(event){
        drawing = true;
        lastMouseEvent = event;
    }, false);
    canvas.addEventListener("mousemove", function(event){
        lastMouseEvent = event;
    }, false);
    canvas.addEventListener("mouseup", function(event){
        drawing = false;
    }, false);
    canvas.addEventListener("mouseout", function(event){
        drawing = false;
    }, false);
    
    const elementButtons = [];
    for(const elementName in elements){
        const element = elements[elementName];
        if(!element.hidden){
            const button = document.createElement("div");
            elementButtons.push(button);
            const label = document.createTextNode(elementName);
            button.appendChild(label);
            const hex = rgb2hex(element.red * 0.5, element.green * 0.5, element.blue * 0.5);
            button.classList.add("elementButton");
            button.style = `background-color: ${hex};`;
            document.getElementById("elementButtons").appendChild(button);
            button.onclick = function(event){
                selectedElement = element;
                for(const other of elementButtons){
                    other.classList.remove("elementButtonSelected");
                }
                button.classList.add("elementButtonSelected");
            }
        }
    }
    
    const update = () => {
        // Draw to buffer
        if(drawing) drawAtMouse(lastMouseEvent);
        // Update game state
        updateBuffers(frame, timeBuffer, currentBuffer, reserveBuffer)
        const tempBuffer = currentBuffer;
        currentBuffer = reserveBuffer;
        reserveBuffer = tempBuffer;
        // Update texture
        blitPixelData(pixels, currentBuffer);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texSubImage2D(
            gl.TEXTURE_2D, 0, 0, 0, bufferWidth, bufferHeight,
            gl.RGB, gl.UNSIGNED_BYTE, pixels
        );
        // Render
        twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
        twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLE_STRIP);
        // Ready for next frame
        requestAnimationFrame(update);
        frame++;
    };
    
    requestAnimationFrame(update);
}

window.onload = begin;
