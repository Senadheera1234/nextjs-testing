'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterApplyTemplateOptions, ColumnFilterClearTemplateOptions } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import type { Member } from './MemberDetail';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:8000';

export default function MemberListPage() {
  const router = useRouter();

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & search (Atlantis "Filter Menu" pattern)
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  // initial page size
  const [rows] = useState<number>(10);

  useEffect(() => {
    initFilters();
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
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
  };

  // ---------- Filtering helpers ----------
  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },

      membership_id: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      first_name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      last_name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      nic: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      phone: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      join_date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
    });
    setGlobalFilterValue('');
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilterValue(value);

    const _filters = { ...filters };
    (_filters['global'] as any).value = value;
    setFilters(_filters);
  };

  const clearFilterTemplate = (options: ColumnFilterClearTemplateOptions) => (
    <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary" />
  );

  const applyFilterTemplate = (options: ColumnFilterApplyTemplateOptions) => (
    <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success" />
  );

  // ---------- Renderers ----------
  const header = (
    <div className="flex justify-content-between align-items-center">
      <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={initFilters} />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search by NIC / Name / Membership ID"
        />
      </span>
    </div>
  );

  const formatDate = (d: string) => (d ? new Date(d).toISOString().slice(0, 10) : '');

  const actionBodyTemplate = (member: Member) => (
    <div className="flex gap-2">
      <Button
        label="View"
        icon="pi pi-eye"
        className="p-button-sm"
        onClick={() => router.push(`/apps/user-management/profile/${member.id}`)}
        aria-label={`View ${member.first_name} ${member.last_name}`}
      />
      <Button
        label="Edit"
        icon="pi pi-pencil"
        className="p-button-sm p-button-outlined"
        onClick={() => router.push(`/apps/user-management/edit/${member.id}`)}
        aria-label={`Edit ${member.first_name} ${member.last_name}`}
      />
    </div>
  );

  // ---------- UI ----------
  return (
    <div className="card">
      <div className="mb-3 flex align-items-center justify-content-between">
        <h2 className="m-0">Members</h2>
        <Button
          label="Create Member"
          icon="pi pi-plus"
          onClick={() => router.push('/apps/user-management/create')}
          aria-label="Create member"
        />
      </div>

      {loading && (
        <div className="flex justify-content-center my-5">
          <ProgressSpinner style={{ width: '40px', height: '40px' }} />
        </div>
      )}

      {!loading && error && (
        <div className="my-5 text-center text-red-500">Error loading members.</div>
      )}

      {!loading && !error && (
        <DataTable
          value={members}
          dataKey="id"
          header={header}
          paginator
          rows={rows}
          rowsPerPageOptions={[5, 10, 15]}
          className="p-datatable-gridlines"
          showGridlines
          loading={loading}
          responsiveLayout="scroll"
          emptyMessage="No members found."
          // filtering (global + column menu)
          filters={filters}
          filterDisplay="menu"
          onFilter={(e) => setFilters(e.filters as DataTableFilterMeta)}
          globalFilterFields={['nic', 'membership_id', 'first_name', 'last_name']}
          tableStyle={{ minWidth: '70rem' }}
        >
          <Column
            field="membership_id"
            header="Membership ID"
            sortable
            filter
            filterPlaceholder="Search ID"
            filterClear={clearFilterTemplate}
            filterApply={applyFilterTemplate}
            style={{ minWidth: '12rem' }}
          />
          <Column
            field="first_name"
            header="First Name"
            sortable
            filter
            filterPlaceholder="Search first name"
            filterClear={clearFilterTemplate}
            filterApply={applyFilterTemplate}
            style={{ minWidth: '12rem' }}
          />
          <Column
            field="last_name"
            header="Last Name"
            sortable
            filter
            filterPlaceholder="Search last name"
            filterClear={clearFilterTemplate}
            filterApply={applyFilterTemplate}
            style={{ minWidth: '12rem' }}
          />
          <Column
            field="nic"
            header="NIC"
            sortable
            filter
            filterPlaceholder="Search NIC"
            filterClear={clearFilterTemplate}
            filterApply={applyFilterTemplate}
            style={{ minWidth: '12rem' }}
          />
          <Column
            field="phone"
            header="Phone"
            filter
            filterPlaceholder="Search phone"
            filterClear={clearFilterTemplate}
            filterApply={applyFilterTemplate}
            style={{ minWidth: '10rem' }}
          />
          <Column
            field="status"
            header="Status"
            sortable
            filter
            filterPlaceholder="Active/Inactive"
            filterClear={clearFilterTemplate}
            filterApply={applyFilterTemplate}
            style={{ minWidth: '10rem' }}
          />
          <Column
            field="join_date"
            header="Join Date"
            sortable
            body={(m) => formatDate((m as Member).join_date)}
            style={{ minWidth: '10rem' }}
          />
          <Column header="Actions" body={actionBodyTemplate} style={{ minWidth: '14rem' }} />
        </DataTable>
      )}
    </div>
  );
}
