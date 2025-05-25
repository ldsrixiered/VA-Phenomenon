// Typewriter
const base = "Welcome to ";
const names = ["Virtual Assistance Phenomenon", "Your Digital Partner", "Your Marketing Assistant", "Your Admin Hero"];
let nameIndex = 0, charIndex = 0, isDeleting = false;
const textElement = document.getElementById("text");

function type() {
    const currentText = names[nameIndex];
    textElement.innerHTML = base + currentText.substring(0, charIndex);
    if (!isDeleting) {
    charIndex++;
    if (charIndex > currentText.length) {
        isDeleting = true;
        setTimeout(type, 1000);
    } else {
        setTimeout(type, 100);
    }
    } else {
    charIndex--;
    if (charIndex < 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, 50);
    }
    }
}

// Theme Toggle
document.getElementById('themeToggle').onclick = () => {
    document.body.classList.toggle('dark');
    document.getElementById('themeToggle').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};

// 3D Network Visualization
const svg = document.getElementById("network");
const svgNS = "http://www.w3.org/2000/svg";

const services = [
    { id: 0, name: "Social Media" },
    { id: 1, name: "Website" },
    { id: 2, name: "Email Mktg" },
    { id: 3, name: "Real Estate" },
    { id: 4, name: "AppFolio" },
    { id: 5, name: "QuickBooks" },
    { id: 6, name: "WordPress" },
];

const links = [
    { from: 0, to: 1, icon: "🌐" },
    { from: 1, to: 2, icon: "✉️" },
    { from: 2, to: 3, icon: "🏠" },
    { from: 3, to: 4, icon: "🗂️" },
    { from: 4, to: 5, icon: "📊" },
    { from: 5, to: 6, icon: "🔧" },
    { from: 6, to: 0, icon: "📱" }
];

const width = 700, height = 400;
const cx = width / 2, cy = height / 2, radius = 140;
let rotation = 0;

const nodes = services.map((s, i) => {
    const angle = (2 * Math.PI * i) / services.length;
    return { ...s, angle };
});

const linkLines = [];
const linkIcons = [];

links.forEach(link => {
    const line = document.createElementNS(svgNS, "line");
    line.classList.add("link");
    svg.appendChild(line);
    linkLines.push(line);

    const icon = document.createElementNS(svgNS, "text");
    icon.textContent = link.icon;
    icon.classList.add("link-icon");
    svg.appendChild(icon);
    linkIcons.push(icon);
});

const nodeGroups = nodes.map(node => {
    const g = document.createElementNS(svgNS, "g");
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("r", 30);
    circle.classList.add("node-circle");
    circle.setAttribute("fill", "var(--primary-color)");
    circle.setAttribute("stroke", "var(--accent-2)");
    circle.setAttribute("stroke-width", 3);
    g.appendChild(circle);

    const text = document.createElementNS(svgNS, "text");
    text.textContent = node.name;
    text.setAttribute("y", 45);
    text.classList.add("node-label");
    g.appendChild(text);

    svg.appendChild(g);
    return g;
});

function animate() {
    rotation += 0.01;

    nodes.forEach((node, i) => {
    const angle = node.angle + rotation;
    const x3d = radius * Math.cos(angle);
    const y3d = radius * Math.sin(angle);
    const z = 80 * Math.sin(angle);
    const scale = 600 / (600 + z);
    const x2d = cx + x3d * scale;
    const y2d = cy + y3d * scale;

    const g = nodeGroups[i];
    g.setAttribute("transform", `translate(${x2d},${y2d}) scale(${scale})`);
    });

    links.forEach((link, i) => {
    const from = nodes[link.from], to = nodes[link.to];
    const fx = cx + radius * Math.cos(from.angle + rotation);
    const fy = cy + radius * Math.sin(from.angle + rotation);
    const tx = cx + radius * Math.cos(to.angle + rotation);
    const ty = cy + radius * Math.sin(to.angle + rotation);

    linkLines[i].setAttribute("x1", fx);
    linkLines[i].setAttribute("y1", fy);
    linkLines[i].setAttribute("x2", tx);
    linkLines[i].setAttribute("y2", ty);

    const icon = linkIcons[i];
    icon.setAttribute("x", (fx + tx) / 2);
    icon.setAttribute("y", (fy + ty) / 2);
    });

    requestAnimationFrame(animate);
}

// Start everything
type();
animate();