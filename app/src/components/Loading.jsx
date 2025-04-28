import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../css/flowchartSkeleton.css'; // <-- Import your custom styles here

function FlowchartSkeleton() {
    return (
        <div className="flowchart-skeleton-container">

            {/* Root Node */}
            <Skeleton className="skeleton-node root-node" />

            {/* Vertical Connector */}
            <div className="connector-vertical" />

            {/* First Level */}
            <div className="first-level">

                {/* Child 1 */}
                <div className="node-group">
                    <Skeleton className="skeleton-node child-node" />
                    <div className="connector-vertical small" />
                    <div className="second-level">
                        <Skeleton className="skeleton-node grandchild-node" />
                        <Skeleton className="skeleton-node grandchild-node" />
                    </div>
                </div>

                {/* Horizontal Connector */}
                <div className="connector-horizontal" />

                {/* Child 2 */}
                <div className="node-group">
                    <Skeleton className="skeleton-node child-node" />
                    <div className="connector-vertical small" />
                    <div className="second-level">
                        <Skeleton className="skeleton-node grandchild-node" />
                        <Skeleton className="skeleton-node grandchild-node" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FlowchartSkeleton;