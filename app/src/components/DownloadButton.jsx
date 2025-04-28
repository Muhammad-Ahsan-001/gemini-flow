import {
    Panel,
    useReactFlow,
    getNodesBounds,
    getViewportForBounds,
} from '@xyflow/react';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl) {
    const a = document.createElement('a');
    a.setAttribute('download', 'reactflow.png');
    a.setAttribute('href', dataUrl);
    a.click();
}

function DownloadButton() {
    const { getNodes } = useReactFlow();

    const onClick = () => {
        // Get the bounds of the nodes (this gives you the width and height of the flowchart)
        const nodesBounds = getNodesBounds(getNodes());

        // Dynamically calculate image width and height based on the flowchart's size
        const imageWidth = nodesBounds.width * 1.2;  // Add a margin (20% in this case)
        const imageHeight = nodesBounds.height * 1.2; // Add a margin (20% in this case)

        // Calculate the viewport transformation to fit the flowchart within the image size
        const viewport = getViewportForBounds(
            nodesBounds,
            imageWidth,
            imageHeight,
            0.5, // Padding (optional) to avoid clipping
            2    // Max zoom level
        );

        // Capture the image using html-to-image with the adjusted transform
        toPng(document.querySelector('.react-flow__viewport'), {
            backgroundColor: '#1a365d',
            width: imageWidth,
            height: imageHeight,
            style: {
                width: imageWidth,
                height: imageHeight,
                transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
            },
        }).then(downloadImage);
    };

    return (
        <Panel position="top-right">
            <button className="download-btn" onClick={onClick}>
                Download Image
            </button>
        </Panel>
    );
}

export default DownloadButton;
