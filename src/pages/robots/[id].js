import React from 'react';
import { useRouter } from 'next/router';
import RobotDetail from '../../components/RobotDetail';
import { robots } from '../../data/robots';

export default function RobotPage() {
  const router = useRouter();
  const { id } = router.query;
  
  // Find the robot by ID
  const robot = robots.find(r => r.id === parseInt(id, 10));
  
  // If the robot is not found or the page is still loading
  if (!robot && !router.isFallback) {
    return (
      <div className="not-found">
        <h1>Robot Not Found</h1>
        <p>The robot you are looking for does not exist.</p>
        <button onClick={() => router.push('/robots')}>
          Back to Robots
        </button>
      </div>
    );
  }
  
  // If the page is still loading (server-side)
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  // Render the robot detail
  return <RobotDetail robot={robot} />;
}

// This function gets called at build time to pre-render all robot pages
export async function getStaticPaths() {
  // Generate paths for all robots
  const paths = robots.map(robot => ({
    params: { id: robot.id.toString() },
  }));
  
  return { paths, fallback: false };
}

// This function gets called at build time to get props for this page
export async function getStaticProps({ params }) {
  // Find the robot by ID
  const robot = robots.find(r => r.id === parseInt(params.id, 10));
  
  // If the robot is not found, return 404
  if (!robot) {
    return {
      notFound: true,
    };
  }
  
  // Return the robot as props
  return {
    props: {
      robot,
    },
  };
} 