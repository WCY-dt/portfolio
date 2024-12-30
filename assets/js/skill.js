const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint } = Matter;
const engine = Engine.create();
const { world } = engine;

const skillContent = document.querySelector('.skill__content');

const render = Render.create({
    element: skillContent,
    engine: engine,
    options: {
        width: skillContent.clientWidth,
        height: skillContent.clientHeight,
        wireframes: false,
        background: '#000000'
    }
});

// Add thicker invisible walls around the edges of the canvas
const wallThickness = 200;
const walls = [
    Bodies.rectangle(skillContent.clientWidth / 2, -wallThickness / 2, skillContent.clientWidth, wallThickness, { isStatic: true, render: { visible: false } }), // Top wall
    Bodies.rectangle(skillContent.clientWidth / 2, skillContent.clientHeight + wallThickness / 2, skillContent.clientWidth, wallThickness, { isStatic: true, render: { visible: false } }), // Bottom wall
    Bodies.rectangle(-wallThickness / 2, skillContent.clientHeight / 2, wallThickness, skillContent.clientHeight, { isStatic: true, render: { visible: false } }), // Left wall
    Bodies.rectangle(skillContent.clientWidth + wallThickness / 2, skillContent.clientHeight / 2, wallThickness, skillContent.clientHeight, { isStatic: true, render: { visible: false } }) // Right wall
];

World.add(world, walls);

const skillImgs = document.querySelectorAll('.skill__img');
skillImgs.forEach((img, i) => {
    img.crossOrigin = "Anonymous";

    img.onload = () => {
        try {
            const screenWidth = window.innerWidth
            const screenHeight = window.innerHeight
            const scale = Math.min(screenWidth, screenHeight) / 1024

            // Create a canvas to extract image data
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.naturalWidth * scale;
            canvas.height = img.naturalHeight * scale;
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Extract image data and create vertices
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const vertices = extractVerticesFromImageData(imageData);

            // Generate random starting x position
            const randomX = Math.random() * skillContent.clientWidth;
            const randomY = Math.random() * skillContent.clientHeight;

            // Create a body from vertices
            const body = Bodies.fromVertices(randomX, randomY, vertices, {
                restitution: 0.5, // Reduce restitution to prevent excessive bouncing
                render: {
                    sprite: {
                        texture: img.src,
                        xScale: scale,
                        yScale: scale
                    }
                }
            }, true);

            World.add(world, body);

            img.style.display = 'none'; // Hide the original img
        } catch (error) {
            console.error(error);
        }
    }

    img.onerror = () => {
        console.error('Failed to load image:', img.src);
    }
});

// Function to extract vertices from image data
function extractVerticesFromImageData(imageData) {
    const { width, height, data } = imageData;
    const threshold = 128; // Alpha threshold for transparency
    const vertices = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const alpha = data[index + 3];
            if (alpha > threshold) {
                vertices.push({ x, y });
            }
        }
    }

    // Simplify the vertices using a convex hull algorithm
    return Matter.Vertices.hull(vertices);
}

// Add mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
});
mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
World.add(world, mouseConstraint);

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // engine.enableSleeping = true;
            engine.world.gravity.y = 0.5;
            engine.world.gravity.x = 0;
            Runner.run(engine);
            Render.run(render);
        } else {
            Runner.stop(engine);
            Render.stop(render);
        }
    });
}, { threshold: 0.1 });

skillObserver.observe(skillContent);