'use client';

import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { ProgressSpinner } from 'primereact/progressspinner';
import type { Member } from './apps/user-management/list/MemberDetail';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:8000';

export default function Dashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stats
  const [totalMembers, setTotalMembers] = useState(0);
  const [newMembersYear, setNewMembersYear] = useState(0);
  const [newMembersMonth, setNewMembersMonth] = useState(0);

  // Chart data
  const [genderChartData, setGenderChartData] = useState<any>(null);
  const [occupationChartData, setOccupationChartData] = useState<any>(null);

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/members/`);
        if (!res.ok) throw new Error('Failed to fetch members');
        const data: Member[] = await res.json();
        setMembers(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching members');
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  useEffect(() => {
    if (!members || members.length === 0) {
      setTotalMembers(0);
      setNewMembersYear(0);
      setNewMembersMonth(0);
      setGenderChartData(null);
      setOccupationChartData(null);
      return;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    let yearCount = 0;
    let monthCount = 0;
    const genderCounts: Record<string, number> = {};
    const occCounts: Record<string, number> = {};

    members.forEach((m) => {
      if (m.join_date) {
        const jd = new Date(m.join_date);
        if (jd.getFullYear() === currentYear) {
          yearCount++;
          if (jd.getMonth() === currentMonth) {
            monthCount++;
          }
        }
      }
      const genderKey = m.gender || 'Unknown';
      genderCounts[genderKey] = (genderCounts[genderKey] || 0) + 1;

      const occKey = m.occupation || 'Other';
      occCounts[occKey] = (occCounts[occKey] || 0) + 1;
    });

    setTotalMembers(members.length);
    setNewMembersYear(yearCount);
    setNewMembersMonth(monthCount);

    const colors = [
      '#0F8BFD', // blue
      '#EC4DBC', // pink
      '#FFCE56', // yellow
      '#00D0DE', // teal
      '#873EFE', // purple
      '#0BD18A', // green
    ];

    // Doughnut data
    const gLabels = Object.keys(genderCounts);
    const gValues = Object.values(genderCounts);
    const gColors = gLabels.map((_, i) => colors[i % colors.length]);
    setGenderChartData({
      labels: gLabels,
      datasets: [
        {
          data: gValues,
          backgroundColor: gColors,
          hoverBackgroundColor: gColors,
          borderColor: 'transparent',
        },
      ],
    });

    // Bar data
    const oLabels = Object.keys(occCounts);
    const oValues = Object.values(occCounts);
    const oColors = oLabels.map((_, i) => colors[(i + 2) % colors.length]);
    setOccupationChartData({
      labels: oLabels,
      datasets: [
        {
          label: 'Members',
          data: oValues,
          backgroundColor: oColors,
        },
      ],
    });
  }, [members]);

  const barOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#CFCFCF' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#CFCFCF' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <div className="grid">
      {loading && (
        <div className="col-12 flex justify-content-center my-5">
          <ProgressSpinner style={{ width: '40px', height: '40px' }} />
        </div>
      )}
      {!loading && error && (
        <div className="col-12 text-red-500 text-center my-5">{error}</div>
      )}
      {!loading && !error && (
        <>
          {/* Info Cards Row */}
          <div className="col-12 mb-4">
            <div className="grid">
              {/* Total Members card */}
              <div className="col-12 md:col-4">
                <div className="card p-3 flex align-items-center justify-content-between">
                  <div>
                    <span className="text-sm text-color-secondary mb-1 block">Total Members</span>
                    <span className="text-3xl font-bold">{totalMembers}</span>
                  </div>
                  <span
                    className="p-3 border-round-lg"
                    style={{ backgroundColor: '#0F8BFD', color: 'white' }}
                  >
                    <i className="pi pi-users text-xl"></i>
                  </span>
                </div>
              </div>
              {/* New Members This Year card */}
              <div className="col-12 md:col-4">
                <div className="card p-3 flex align-items-center justify-content-between">
                  <div>
                    <span className="text-sm text-color-secondary mb-1 block">New Members (This Year)</span>
                    <span className="text-3xl font-bold">{newMembersYear}</span>
                  </div>
                    <span
                    className="p-3 border-round-lg"
                    style={{ backgroundColor: '#0BD18A', color: 'white' }}
                  >
                    <i className="pi pi-user-plus text-xl"></i>
                  </span>
                </div>
              </div>
              {/* New Members This Month card */}
              <div className="col-12 md:col-4">
                <div className="card p-3 flex align-items-center justify-content-between">
                  <div>
                    <span className="text-sm text-color-secondary mb-1 block">New Members (This Month)</span>
                    <span className="text-3xl font-bold">{newMembersMonth}</span>
                  </div>
                  <span
                    className="p-3 border-round-lg"
                    style={{ backgroundColor: '#EC4DBC', color: 'white' }}
                  >
                    <i className="pi pi-user text-xl"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="col-12 md:col-6">
            <div className="card p-3">
              <h5 className="mb-3">Gender Breakdown</h5>
              {genderChartData && (
                <Chart
                  type="doughnut"
                  data={genderChartData}
                  options={{
                    plugins: {
                      legend: { position: 'bottom', labels: { color: '#CFCFCF' } },
                    },
                    cutout: '70%',
                  }}
                  style={{ width: '100%', height: '250px' }} // size matched with bar chart
                />
              )}
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="card p-3">
              <h5 className="mb-3">Occupation Distribution</h5>
              {occupationChartData && (
                <Chart
                  type="bar"
                  data={occupationChartData}
                  options={barOptions}
                  style={{ width: '100%', height: '250px' }}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
