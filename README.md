<h1>Algorithm Visualiser</h1>

An interactive web app for visualising and understanding how different AI and reinforcement learning algorithms work. The visualiser provides step-by-step demonstrations of algorithms running on various environments, making it easier to grasp the mechanics behind training, exploration, and convergence.

<h2>✨ Features</h2>
<ul>
<li>📊 <b>Algorithm Visualisation</b> – Watch RL/AI algorithms learn in real time.</li>

<li>🧩 <b>Multiple Environments</b> – Supports classic benchmarks like CartPole, GridWorld, and more.</li>

<li>🔄 <b>Step-by-Step Playback</b> – Pause, rewind, or fast-forward through algorithm execution.</li>

<li>📁 <b>Preloaded Weights & Metrics</b> – Load pretrained models for instant demonstrations.</li>

<li>🎨 <b>Clean UI</b> – Built with a modern frontend for smooth user experience.</li>
</ul>


<h2>🚀 Tech Stack</h2>
<ul>
<li><b>Frontend</b>: Next.js + TypeScript + Tailwind CSS</li>

<li><b>Backend</b>: python-socketio / Node.js </li>

<li><b>Environments</b>: OpenAI Gymnasium</li>

<li><b>Visualization</b>: Chart.js + custom rendering</li>
</ul>

<h2>🛠 Development Notes</h2>
<ul>
<li>The client automatically loads model weights and metrics for the selected environment.</li>

<li>To add a new algorithm or environment, extend the algorithms/ or envs/ directory and update the frontend routing.</li>

<li>For deployment, configure static asset hosting for pretrained models.</li>
</ul>
