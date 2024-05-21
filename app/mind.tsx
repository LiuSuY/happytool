'use client'
import { useInsertionEffect } from 'react'
import G6 from '@antv/g6';

export default function Mind() {
    const lineDash = [4, 2, 1, 2];
    G6.registerEdge(
        'line-dash',
        {
            afterDraw(cfg, group) {
                if (!group) return;
                // get the first shape in the group, it is the edge's path here=
                const shape = group.get('children')[0];
                let index = 0;
                // Define the animation
                shape.animate(
                    () => {
                        index++;
                        if (index > 9) {
                            index = 0;
                        }
                        const res = {
                            lineDash,
                            lineDashOffset: -index,
                        };
                        // returns the modified configurations here, lineDash and lineDashOffset here
                        return res;
                    },
                    {
                        repeat: true, // whether executes the animation repeatly
                        duration: 3000, // the duration for executing once
                    },
                );
            },
        },
        'cubic', // extend the built-in edge 'cubic'
    );
    const data = {
        nodes: [
            {
                id: 'node1',
                x: 100,
                y: 100,
                label: 'Node 1',
                size: 10,
                labelCfg: {
                    position: 'top',
                },
            },
            {
                id: 'node2',
                x: 300,
                y: 200,
                color: '#40a9ff',
                label: 'Node 2',
                size: 10,
                labelCfg: {
                    position: 'left',
                    offset: 10,
                },
            },
        ],
        edges: [
            {
                source: 'node1',
                target: 'node2',
            },
        ],
    };

    useInsertionEffect(() => {
        const graph = new G6.Graph({
            container: 'mind_container', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
            width: 800, // Number，必须，图的宽度
            height: 400, // Number，必须，图的高度
            defaultEdge: {
                type: 'line-dash',
                style: {
                    stroke: 'red',
                    lineWidth: 2,
                },
                labelCfg: {
                    position: 'start',
                    refY: +10,
                },
            },
        });
        graph.data(data); // 读取 Step 2 中的数据源到图上
        graph.render();
    })
    return <div>hello tool<div id="mind_container"></div></div>
}