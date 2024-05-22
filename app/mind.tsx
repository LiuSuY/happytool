"use client"
import { useEffect, useRef } from 'react';
import G6, { Graph } from '@antv/g6';
import { useRouter } from 'next/navigation';

export default function Mind(props: { title: string }) {

    const containerRef = useRef(null);
    const router = useRouter();
    let graph: Graph | null = null;
    const lineDash = [4, 2, 1, 2];

    G6.registerEdge(
        'line-dash',
        {
            afterDraw(cfg, group) {
                if (!group) return;
                const shape = group.get('children')[0];
                let index = 0;

                shape.animate(
                    () => {
                        index = (index + 1) % 10;
                        const res = {
                            lineDash,
                            lineDashOffset: -index,
                        };
                        return res;
                    },
                    {
                        repeat: true,
                        duration: 3000,
                    },
                );
            },
        },
        'cubic',
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

    useEffect(() => {
        if (containerRef.current) {
            graph = new G6.Graph({
                container: containerRef.current,
                width: 800,
                height: 400,
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

            graph.data(data);
            graph.render();
        }

        return () => {
            graph && graph.destroy();
        };
    }, []);
    const handleGoBack = () => {
        router.back();
    };
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className="absolute top-[10px] left-[10px] cursor-pointer" onClick={handleGoBack}>back</div>
            <div className='my-10 text-red-800 text-3xl'>{props.title}</div>
            <div ref={containerRef} id="mind_container"></div>
        </div>
    );
}


