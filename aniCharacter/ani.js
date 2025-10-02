


const shape = document.getElementById("shape");
const leftEye = document.getElementById("leftEye");
const rightEye = document.getElementById("rightEye");
// shapes list
const shapes = [
    {
        d: "M40.7694 3.75646C41.8989 6.25704 41.2425 18.0384 41.2425 22.3392C51.3715 13.0556 72.9221 14.2621 62.3829 32.6188C60.8086 35.3608 56.4049 40.7567 58.1356 39.9826C62.0997 38.2096 77.8979 30.7726 78.1059 39.8564C78.6065 61.7276 52.0794 91.4276 28.4513 80.8065C13.5925 74.1274 -3.60747 58.0462 1.48277 39.6537C3.35013 32.9065 33.4303 -12.4909 40.7694 3.75646Z",
        color: "#314CD7" // blue flower

    },
    {
        d: "M2.29345 2.29346C7.17922 -2.5923 18.7346 0.59577 30.9311 9.3169C43.1279 0.595431 54.684 -2.59239 59.5698 2.29346C64.4556 7.17929 61.2668 18.7344 52.5454 30.9312C61.2671 43.1281 64.4557 54.6839 59.5698 59.5698C54.6839 64.4557 43.1281 61.2671 30.9311 52.5454C18.7344 61.2667 7.17928 64.4556 2.29345 59.5698C-2.59239 54.684 0.595449 43.1279 9.31689 30.9312C0.595764 18.7346 -2.59231 7.17923 2.29345 2.29346Z",
        color: "#FB6155" // pink cross
    },
    {
        d: "M1.28762 40.7656C-0.932042 60.7952 0.391634 75.8258 0.391634 75.8258C20.3525 72.8298 43.2225 70.5181 62.9105 70.05L62.9204 69.611C63.4103 47.8929 63.9941 22.0157 46.6571 6.00337C24.268 -14.6751 3.22182 23.3118 1.28762 40.7656Z",
        color: "#F7D649" // yellow half circle
    }
];

const leftEyes = [
    { cx: 16, cy: 40, rx: 10, ry: 12 },
    { cx: 26, cy: 16, rx: 8, ry: 4 },
    { cx: 16, cy: 16, rx: 10, ry: 12 }
];

const rightEyes = [
    { cx: 36, cy: 40, rx: 10, ry: 12 },
    { cx: 46, cy: 16, rx: 8, ry: 4 },
    { cx: 36, cy: 16, rx: 10, ry: 12 }
];

const leftEyesBlack = [
    { cx: 14, cy: 44, rx: 6, ry: 8 },
    { cx: 30, cy: 16, rx: 4, ry: 4 },
    { cx: 14, cy: 16, rx: 6, ry: 8 }
];

const rightEyesBlack = [
    { cx: 34, cy: 44, rx: 6, ry: 8 },
    { cx: 50, cy: 16, rx: 4, ry: 4 },
    { cx: 34, cy: 16, rx: 6, ry: 8 }
];

let current = 0;
const duration = 1000;

function animate() {
    const next = (current + 1) % shapes.length;

    const interpShape = flubber.interpolate(shapes[current].d, shapes[next].d);

    const start = performance.now();


    function frame(t) {
        const progress = Math.min((t - start) / duration, 1);
        shape.setAttribute("d", interpShape(progress));
        shape.setAttribute("fill", shapes[next].color);

        const lerp = (a, b) => a + (b - a) * progress;

        leftEye.setAttribute("cx", lerp(leftEyes[current].cx, leftEyes[next].cx));
        leftEye.setAttribute("cy", lerp(leftEyes[current].cy, leftEyes[next].cy));
        leftEye.setAttribute("rx", lerp(leftEyes[current].rx, leftEyes[next].rx));
        leftEye.setAttribute("ry", lerp(leftEyes[current].ry, leftEyes[next].ry));

        rightEye.setAttribute("cx", lerp(rightEyes[current].cx, rightEyes[next].cx));
        rightEye.setAttribute("cy", lerp(rightEyes[current].cy, rightEyes[next].cy));
        rightEye.setAttribute("rx", lerp(rightEyes[current].rx, rightEyes[next].rx));
        rightEye.setAttribute("ry", lerp(rightEyes[current].ry, rightEyes[next].ry));


        leftEyeBlack.setAttribute("cx", lerp(leftEyesBlack[current].cx, leftEyesBlack[next].cx));
        leftEyeBlack.setAttribute("cy", lerp(leftEyesBlack[current].cy, leftEyesBlack[next].cy));
        leftEyeBlack.setAttribute("rx", lerp(leftEyesBlack[current].rx, leftEyesBlack[next].rx));
        leftEyeBlack.setAttribute("ry", lerp(leftEyesBlack[current].ry, leftEyesBlack[next].ry));

        rightEyeBlack.setAttribute("cx", lerp(rightEyesBlack[current].cx, rightEyesBlack[next].cx));
        rightEyeBlack.setAttribute("cy", lerp(rightEyesBlack[current].cy, rightEyesBlack[next].cy));
        rightEyeBlack.setAttribute("rx", lerp(rightEyesBlack[current].rx, rightEyesBlack[next].rx));
        rightEyeBlack.setAttribute("ry", lerp(rightEyesBlack[current].ry, rightEyesBlack[next].ry));


        const wobbleX = 5 * Math.sin(progress * Math.PI);
        leftEye.setAttribute("transform", `translate(${wobbleX},0)`);
        rightEye.setAttribute("transform", `translate(${-wobbleX},0)`);
        leftEyeBlack.setAttribute("transform", `translate(${wobbleX},0)`);
        rightEyeBlack.setAttribute("transform", `translate(${-wobbleX},0)`);

        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            current = next;
            setTimeout(animate, 300); // loop continues
        }
    }
    requestAnimationFrame(frame);
}
animate();