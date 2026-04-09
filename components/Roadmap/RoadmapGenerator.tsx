"use client";

import React, { useState, useEffect } from 'react';
import { ClipboardList, ChevronRight, Target, Brain, Code, Rocket, CheckCircle2, Circle } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  completed: boolean;
}

interface Roadmap {
  title: string;
  items: RoadmapItem[];
}

const roadmaps: Record<string, Roadmap> = {
  // Full Stack
  'FullStack-Beginner': {
    title: 'Full Stack Developer (Beginner)',
    items: [
      { id: 'fs-b-1', title: 'HTML5, CSS3 & Responsive Design', completed: false },
      { id: 'fs-b-2', title: 'JavaScript Fundamentals & DOM', completed: false },
      { id: 'fs-b-3', title: 'React.js Basics: Components & Hooks', completed: false },
      { id: 'fs-b-4', title: 'Node.js & Express Basics', completed: false },
      { id: 'fs-b-5', title: 'SQL Fundamentals (PostgreSQL)', completed: false },
    ]
  },
  'FullStack-Intermediate': {
    title: 'Full Stack Developer (Intermediate)',
    items: [
      { id: 'fs-i-1', title: 'Next.js: SSR, SSG & API Routes', completed: false },
      { id: 'fs-i-2', title: 'State Management (Redux/Zustand)', completed: false },
      { id: 'fs-i-3', title: 'Authentication & JWT Patterns', completed: false },
      { id: 'fs-i-4', title: 'Docker & Containerization', completed: false },
      { id: 'fs-i-5', title: 'Prisma ORM & Redis Caching', completed: false },
    ]
  },
  'FullStack-Experienced': {
    title: 'Full Stack Developer (Experienced)',
    items: [
      { id: 'fs-e-1', title: 'Microservices Architecture', completed: false },
      { id: 'fs-e-2', title: 'Cloud Native Design (AWS/GCP)', completed: false },
      { id: 'fs-e-3', title: 'CI/CD Pipelines & DevSecOps', completed: false },
      { id: 'fs-e-4', title: 'System Design: Scaling & HA', completed: false },
      { id: 'fs-e-5', title: 'GraphQL & Apollo Federation', completed: false },
    ]
  },

  // Data Scientist
  'DataScientist-Beginner': {
    title: 'Data Scientist (Beginner)',
    items: [
      { id: 'ds-b-1', title: 'Python for Data Science (Pandas, Numpy)', completed: false },
      { id: 'ds-b-2', title: 'Statistics & Probability Basics', completed: false },
      { id: 'ds-b-3', title: 'Data Visualization (Matplotlib, Seaborn)', completed: false },
      { id: 'ds-b-4', title: 'SQL for Data Analysis', completed: false },
      { id: 'ds-b-5', title: 'Intro to Machine Learning (Scikit-Learn)', completed: false },
    ]
  },
  'DataScientist-Intermediate': {
    title: 'Data Scientist (Intermediate)',
    items: [
      { id: 'ds-i-1', title: 'Advanced ML: Trees, Ensembles, XGBoost', completed: false },
      { id: 'ds-i-2', title: 'Feature Engineering & Selection', completed: false },
      { id: 'ds-i-3', title: 'Deep Learning Basics (TensorFlow/PyTorch)', completed: false },
      { id: 'ds-i-4', title: 'Natural Language Processing (NLP)', completed: false },
      { id: 'ds-i-5', title: 'A/B Testing & Hypothesis Testing', completed: false },
    ]
  },
  'DataScientist-Experienced': {
    title: 'Data Scientist (Experienced)',
    items: [
      { id: 'ds-e-1', title: 'MLOps: Deployment & Monitoring', completed: false },
      { id: 'ds-e-2', title: 'Big Data Processing (Spark)', completed: false },
      { id: 'ds-e-3', title: 'Advanced Computer Vision/LLMs', completed: false },
      { id: 'ds-e-4', title: 'Reinforcement Learning', completed: false },
      { id: 'ds-e-5', title: 'AI Ethics & Explainability', completed: false },
    ]
  },

  // Data Analyst
  'DataAnalyst-Beginner': {
    title: 'Data Analyst (Beginner)',
    items: [
      { id: 'da-b-1', title: 'Excel Advanced: Pivot Tables, VLOOKUP', completed: false },
      { id: 'da-b-2', title: 'SQL Basics: Joins, Aggregations', completed: false },
      { id: 'da-b-3', title: 'Intro to Tableau/Power BI', completed: false },
      { id: 'da-b-4', title: 'Descriptive Statistics', completed: false },
      { id: 'da-b-5', title: 'Data Cleaning Fundamentals', completed: false },
    ]
  },
  'DataAnalyst-Intermediate': {
    title: 'Data Analyst (Intermediate)',
    items: [
      { id: 'da-i-1', title: 'Python for Data Analysis (NumPy, Pandas)', completed: false },
      { id: 'da-i-2', title: 'Advanced SQL: CTEs, Window Functions', completed: false },
      { id: 'da-i-3', title: 'Dashboard Design & Storytelling', completed: false },
      { id: 'da-i-4', title: 'Statistical Hypothesis Testing', completed: false },
      { id: 'da-i-5', title: 'ETL Basics for Analysts', completed: false },
    ]
  },
  'DataAnalyst-Experienced': {
    title: 'Data Analyst (Experienced)',
    items: [
      { id: 'da-e-1', title: 'Predictive Modeling & Forecasting', completed: false },
      { id: 'da-e-2', title: 'Advanced Visualization (D3.js/Plotly)', completed: false },
      { id: 'da-e-3', title: 'Data Governance & Strategy', completed: false },
      { id: 'da-e-4', title: 'Big Data Tools (Hive, Presto)', completed: false },
      { id: 'da-e-5', title: 'Business Intelligence Architecture', completed: false },
    ]
  },

  // Data Engineer
  'DataEngineer-Beginner': {
    title: 'Data Engineer (Beginner)',
    items: [
      { id: 'de-b-1', title: 'Python & Bash Scripting', completed: false },
      { id: 'de-b-2', title: 'SQL & Database Design', completed: false },
      { id: 'de-b-3', title: 'Intro to ETL/ELT Pipelines', completed: false },
      { id: 'de-b-4', title: 'Cloud Storage Basics (S3/GCS)', completed: false },
      { id: 'de-b-5', title: 'Version Control (Git) for Data', completed: false },
    ]
  },
  'DataEngineer-Intermediate': {
    title: 'Data Engineer (Intermediate)',
    items: [
      { id: 'de-i-1', title: 'Apache Spark & Distributed Computing', completed: false },
      { id: 'de-i-2', title: 'Data Modeling (Star/Snowflake Schema)', completed: false },
      { id: 'de-i-3', title: 'Workflow Orchestration (Airflow/Prefect)', completed: false },
      { id: 'de-i-4', title: 'NoSQL Databases (MongoDB, Cassandra)', completed: false },
      { id: 'de-i-5', title: 'Data Warehousing (Snowflake/BigQuery)', completed: false },
    ]
  },
  'DataEngineer-Experienced': {
    title: 'Data Engineer (Experienced)',
    items: [
      { id: 'de-e-1', title: 'Streaming Data Pipelines (Kafka/Flink)', completed: false },
      { id: 'de-e-2', title: 'Data Mesh & Fabric Architecture', completed: false },
      { id: 'de-e-3', title: 'Infrastructure as Code (Terraform)', completed: false },
      { id: 'de-e-4', title: 'Data Quality & Observability', completed: false },
      { id: 'de-e-5', title: 'Real-time Analytics Engine Design', completed: false },
    ]
  },

  // Cloud Engineer
  'CloudEngineer-Beginner': {
    title: 'Cloud Engineer (Beginner)',
    items: [
      { id: 'ce-b-1', title: 'Cloud Fundamentals (AWS/Azure/GCP)', completed: false },
      { id: 'ce-b-2', title: 'Networking: VPC, Subnets, DNS', completed: false },
      { id: 'ce-b-3', title: 'Compute Services (EC2/Lambda)', completed: false },
      { id: 'ce-b-4', title: 'Identity & Access Management (IAM)', completed: false },
      { id: 'ce-b-5', title: 'Linux Administration Basics', completed: false },
    ]
  },
  'CloudEngineer-Intermediate': {
    title: 'Cloud Engineer (Intermediate)',
    items: [
      { id: 'ce-i-1', title: 'Kubernetes & Container Orchestration', completed: false },
      { id: 'ce-i-2', title: 'Serverless Application Patterns', completed: false },
      { id: 'ce-i-3', title: 'Infrastructure as Code (CloudFormation)', completed: false },
      { id: 'ce-i-4', title: 'Cloud Security & Compliance', completed: false },
      { id: 'ce-i-5', title: 'Monitoring & Logging (CloudWatch/ELK)', completed: false },
    ]
  },
  'CloudEngineer-Experienced': {
    title: 'Cloud Engineer (Experienced)',
    items: [
      { id: 'ce-e-1', title: 'Multi-Cloud Strategy & Hybrid Cloud', completed: false },
      { id: 'ce-e-2', title: 'FinOps: Cloud Cost Optimization', completed: false },
      { id: 'ce-e-3', title: 'Site Reliability Engineering (SRE)', completed: false },
      { id: 'ce-e-4', title: 'Disaster Recovery & BC Planning', completed: false },
      { id: 'ce-e-5', title: 'Enterprise Cloud Governance', completed: false },
    ]
  },
};

export default function RoadmapGenerator() {
  const [role, setRole] = useState('FullStack');
  const [level, setLevel] = useState('Beginner');
  const [generatedRoadmap, setGeneratedRoadmap] = useState<Roadmap | null>(null);

  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem('brainlink_roadmap');
    if (saved) {
      setGeneratedRoadmap(JSON.parse(saved));
    }
  }, []);

  // Save persistence
  useEffect(() => {
    if (generatedRoadmap) {
      localStorage.setItem('brainlink_roadmap', JSON.stringify(generatedRoadmap));
    }
  }, [generatedRoadmap]);

  const handleGenerate = () => {
    const key = `${role}-${level}`;
    setGeneratedRoadmap(roadmaps[key] || roadmaps['Frontend-Beginner']);
  };

  const toggleItem = (id: string) => {
    if (!generatedRoadmap) return;
    const newItems = generatedRoadmap.items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setGeneratedRoadmap({ ...generatedRoadmap, items: newItems });
  };

  return (
    <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl text-slate-50 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <Target className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Placement Roadmap Generator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Target Role</label>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-slate-200"
          >
            <option value="FullStack">Full Stack Developer</option>
            <option value="DataScientist">Data Scientist</option>
            <option value="DataAnalyst">Data Analyst</option>
            <option value="DataEngineer">Data Engineer</option>
            <option value="CloudEngineer">Cloud Engineer</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Skill Level</label>
          <select 
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-slate-200"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Experienced">Experienced</option>
          </select>
        </div>
      </div>

      <button 
        onClick={handleGenerate}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-slate-950 font-bold hover:scale-[1.02] transition-transform mb-12 shadow-lg shadow-primary/20"
      >
        Generate Custom Roadmap
      </button>

      {generatedRoadmap && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary">{generatedRoadmap.title}</h3>
            <span className="text-xs font-mono text-slate-500">
              Progress: {Math.round((generatedRoadmap.items.filter(i => i.completed).length / generatedRoadmap.items.length) * 100)}%
            </span>
          </div>
          
          <div className="space-y-3">
            {generatedRoadmap.items.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                  item.completed 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                  )}
                  <span className={item.completed ? 'text-slate-400 line-through' : 'text-slate-200'}>
                    {item.title}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${item.completed ? 'opacity-0' : 'text-slate-500'}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
