"use client";

import React, { useMemo } from "react";

/**
 * NeuralNetSVG
 * Renders a fully-connected neural network as an SVG.
 *
 * Props
 * - layers: number[] — number of nodes in each layer (e.g., [3,5,4,1])
 * - width?: number — outer SVG width in px (default 800)
 * - height?: number — outer SVG height in px (default 400)
 * - padding?: number — inner padding for the drawing area (default 32)
 * - nodeRadius?: number — radius of each node (default 10)
 * - strokeWidth?: number — stroke width for connections (default 1.5)
 * - animate?: boolean — whether to animate edge drawing (default true)
 * - directed?: boolean — draw arrows on edges (default false)
 * - showLayerLabels?: boolean — show L0, L1, ... under layers (default true)
 * - className?: string — optional className for outer wrapper
 * - nodeColor?: string — fill color for nodes
 * - edgeColor?: string — stroke color for edges
 * - labelColor?: string — color for labels
 * - highlightPath?: [number, number][] — optional path highlighting given as
 *     array of [layerIndex, nodeIndex], e.g., [[0,1],[1,3],[2,0]]
 * - onNodeClick?: (info: { layer: number; index: number }) => void
 * - onEdgeClick?: (info: { from: { layer: number; index: number }, to: { layer: number; index: number } }) => void
 */
export default function NeuralNetSVG({
  layers,
  width = 800,
  height = 400,
  padding = 32,
  nodeRadius = 10,
  strokeWidth = 1.5,
  animate = true,
  directed = false,
  showLayerLabels = true,
  className,
  nodeColor = "#0ea5e9", // sky-500
  edgeColor = "#94a3b8", // slate-400
  labelColor = "#334155", // slate-700
  highlightPath,
  onNodeClick,
  onEdgeClick,
}: {
  layers: number[];
  width?: number;
  height?: number;
  padding?: number;
  nodeRadius?: number;
  strokeWidth?: number;
  animate?: boolean;
  directed?: boolean;
  showLayerLabels?: boolean;
  className?: string;
  nodeColor?: string;
  edgeColor?: string;
  labelColor?: string;
  highlightPath?: [number, number][];
  onNodeClick?: (info: { layer: number; index: number }) => void;
  onEdgeClick?: (info: {
    from: { layer: number; index: number };
    to: { layer: number; index: number };
  }) => void;
}) {
  // Guard against invalid input
  const validLayers =
    Array.isArray(layers) &&
    layers.length > 0 &&
    layers.every((n) => Number.isFinite(n) && n > 0);
  if (!validLayers) {
    return (
      <div
        className={className}
        style={{
          width,
          height,
          display: "grid",
          placeItems: "center",
          border: "1px dashed #e2e8f0",
          borderRadius: 12,
        }}
      >
        <p style={{ color: "#64748b" }}>
          Provide a valid `layers` prop, e.g. <code>[3, 5, 4, 1]</code>
        </p>
      </div>
    );
  }

  // Compute layout
  const { layerX, nodeYs, edges, highlightedEdges } = useMemo(() => {
    const innerW = width - 2 * padding;
    const innerH = height - 2 * padding;

    const L = layers.length;
    const layerX = Array.from({ length: L }, (_, i) => {
      return padding + (L === 1 ? innerW / 2 : (innerW * i) / (L - 1));
    });

    const nodeYs = layers.map((count) => {
      const positions: number[] = [];
      if (count === 1) {
        positions.push(padding + innerH / 2);
      } else {
        for (let i = 0; i < count; i++) {
          positions.push(padding + (innerH * i) / (count - 1));
        }
      }
      return positions;
    });

    // Build edge list
    type Edge = {
      from: { l: number; i: number; x: number; y: number };
      to: { l: number; i: number; x: number; y: number };
    };
    const edges: Edge[] = [];
    for (let l = 0; l < L - 1; l++) {
      for (let i = 0; i < layers[l]; i++) {
        for (let j = 0; j < layers[l + 1]; j++) {
          edges.push({
            from: { l, i, x: layerX[l], y: nodeYs[l][i] },
            to: { l: l + 1, i: j, x: layerX[l + 1], y: nodeYs[l + 1][j] },
          });
        }
      }
    }

    // Highlighted path → set of edges
    const highlightedEdges = new Set<string>();
    if (highlightPath && highlightPath.length >= 2) {
      for (let k = 0; k < highlightPath.length - 1; k++) {
        const [l1, i1] = highlightPath[k];
        const [l2, i2] = highlightPath[k + 1];
        if (l2 === l1 + 1) {
          highlightedEdges.add(`${l1}:${i1}->${l2}:${i2}`);
        }
      }
    }

    return { layerX, nodeYs, edges, highlightedEdges };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    JSON.stringify(layers),
    width,
    height,
    padding,
    highlightPath?.map((x) => x.join(","))?.join("|"),
  ]);

  const arrowMarkerId = useMemo(
    () => `arrow-${Math.random().toString(36).slice(2)}`,
    []
  );

  return (
    <div
      className={className}
      style={{ width, height, position: "relative", overflow: "auto" }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Neural network diagram"
      >
        <defs>
          {directed && (
            <marker
              id={arrowMarkerId}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L10,3 L0,6 Z" fill={edgeColor} />
            </marker>
          )}
          {animate && (
            <style>{`
              @keyframes drawEdge { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
            `}</style>
          )}
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={nodeColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={nodeColor} stopOpacity="0.35" />
          </radialGradient>
        </defs>

        {/* Edges */}
        <g>
          {edges.map((e, idx) => {
            const key = `${e.from.l}:${e.from.i}->${e.to.l}:${e.to.i}`;
            const isHighlight = highlightedEdges.has(key);
            const sw = isHighlight ? strokeWidth * 2.2 : strokeWidth;
            const color = isHighlight ? nodeColor : edgeColor;
            const dashArray = animate ? 1 : undefined; // enables dashoffset trick
            const dashOffset = animate ? 1 : undefined;

            return (
              <line
                key={key + idx}
                x1={e.from.x}
                y1={e.from.y}
                x2={e.to.x}
                y2={e.to.y}
                stroke={color}
                strokeWidth={sw}
                strokeLinecap="round"
                markerEnd={directed ? `url(#${arrowMarkerId})` : undefined}
                style={
                  animate
                    ? {
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                        animation: `drawEdge 900ms ease forwards`,
                        animationDelay: `${(idx % 20) * 15}ms`,
                      }
                    : undefined
                }
                onClick={() =>
                  onEdgeClick?.({
                    from: { layer: e.from.l, index: e.from.i },
                    to: { layer: e.to.l, index: e.to.i },
                  })
                }
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {layers.map((count, l) => (
            <g key={`layer-${l}`}>
              {Array.from({ length: count }, (_, i) => (
                <circle
                  key={`n-${l}-${i}`}
                  cx={layerX[l]}
                  cy={nodeYs[l][i]}
                  r={nodeRadius}
                  fill="url(#node-glow)"
                  stroke={nodeColor}
                  strokeWidth={1}
                  onClick={() => onNodeClick?.({ layer: l, index: i })}
                ></circle>
              ))}
              {showLayerLabels && (
                <text
                  x={layerX[l]}
                  y={height - Math.max(8, padding / 2)}
                  textAnchor="middle"
                  fontSize={12}
                  fill={labelColor}
                >
                  {`L${l} (${count})`}
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>

      {/* Minimal legend / overlay */}
      <div
        style={{
          position: "absolute",
          left: 8,
          top: 8,
          background: "rgba(255,255,255,0.8)",
          borderRadius: 12,
          padding: "6px 10px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          fontSize: 12,
          color: "#334155",
        }}
      >
        <strong style={{ fontWeight: 600 }}>Layers:</strong>{" "}
        {layers.join(" → ")}
      </div>
    </div>
  );
}

/**
 * Example usage:
 *
 * <NeuralNetSVG
 *   layers={[3, 5, 4, 1]}
 *   width={900}
 *   height={420}
 *   directed
 *   highlightPath={[[0,1],[1,3],[2,0],[3,0]]}
 *   onNodeClick={({layer, index}) => console.log('node', layer, index)}
 * />
 */
