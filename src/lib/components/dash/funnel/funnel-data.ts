import { Users, Coffee, ThumbsUp, Phone, Map, ShoppingCart } from 'lucide-svelte';
import type { FunnelStep } from '../dashboard-types';

// Default funnel steps data
export const defaultFunnelSteps: FunnelStep[] = [
  {
    id: '1',
    type: 'awareness',
    name: 'Awareness',
    description: 'Get attention',
    icon: Users,
    color: '#ef4444',
    x: 150,
    y: 50,
    width: 200,
    targets: ['2'],
    metrics: {
      reach: '12,500',
      impressions: '45,000'
    }
  },
  {
    id: '2',
    type: 'interest',
    name: 'Interest',
    description: 'Build curiosity',
    icon: Coffee,
    color: '#3b82f6',
    x: 150,
    y: 180,
    width: 200,
    targets: ['3'],
    metrics: {
      clicks: '2,250',
      ctr: '5.0%'
    }
  },
  {
    id: '3',
    type: 'consideration',
    name: 'Consideration',
    description: 'Evaluate options',
    icon: ThumbsUp,
    color: '#f59e0b',
    x: 150,
    y: 310,
    width: 200,
    targets: ['4a', '4b', '4c'],
    metrics: {
      pageViews: '1,870',
      timeOnPage: '1:45'
    }
  },
  {
    id: '4a',
    type: 'conversion',
    name: 'Phone Call',
    description: 'Make reservation',
    icon: Phone,
    color: '#10b981',
    x: 50,
    y: 440,
    width: 120,
    targets: [],
    metrics: {
      calls: '95',
      callRate: '5.1%'
    }
  },
  {
    id: '4b',
    type: 'conversion',
    name: 'Directions',
    description: 'Visit location',
    icon: Map,
    color: '#8b5cf6',
    x: 190,
    y: 440,
    width: 120,
    targets: [],
    metrics: {
      directionClicks: '128',
      clickRate: '6.8%'
    }
  },
  {
    id: '4c',
    type: 'conversion',
    name: 'Order Online',
    description: 'Place takeout order',
    icon: ShoppingCart,
    color: '#ec4899',
    x: 330,
    y: 440,
    width: 120,
    targets: [],
    metrics: {
      orders: '76',
      orderRate: '4.1%'
    }
  }
];

// Helper function to update funnel metrics based on budget
export function updateMetricsForBudget(funnelSteps: FunnelStep[], budget: number): FunnelStep[] {
  const baselineBudget = 750;
  const budgetFactor = budget / baselineBudget;
  
  return funnelSteps.map(step => {
    const updatedStep = { ...step };
    
    // Update metrics based on budget factor
    if (step.id === '1') {
      const impressions = Math.round(45000 * budgetFactor);
      const reach = Math.round(12500 * budgetFactor);
      
      updatedStep.metrics = {
        ...updatedStep.metrics,
        impressions: impressions.toLocaleString(),
        reach: reach.toLocaleString()
      };
    } else if (step.id === '2') {
      const clicks = Math.round(2250 * budgetFactor);
      
      updatedStep.metrics = {
        ...updatedStep.metrics,
        clicks: clicks.toLocaleString()
      };
    }
    
    return updatedStep;
  });
}
