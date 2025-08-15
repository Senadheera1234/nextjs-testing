'use client';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { ProgressBar } from 'primereact/progressbar';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Carousel } from 'primereact/carousel';
import { Timeline } from 'primereact/timeline';
import { CustomerService } from '../../demo/service/CustomerService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { ChartData, ChartOptions, ChartDataset } from 'chart.js';

type BarOrLine = 'bar' | 'line';

let visitorChart: ChartData;
let countryChart: ChartData;
let revenueChart: ChartData;
let customerChart: ChartData;

const Dashboard = () => {
    const [visitorChartOptions, setVisitorChartOptions] = useState<ChartOptions | null>(null);
    const [countryChartOptions, setCountryChartOptions] = useState<ChartOptions | null>(null);
    const [revenueChartOptions, setRevenueChartOptions] = useState<ChartOptions | null>(null);
    const [customerChartOptions, setCustomerChartOptions] = useState<ChartOptions | null>(null);

    const getVisitorChart = (documentStyle: CSSStyleDeclaration): ChartData<BarOrLine> => {
        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Plan',
                    data: [630, 630, 695, 695, 695, 760, 760, 760, 840, 840, 840, 840],
                    borderColor: ['#FC6161'],
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    type: 'line',
                    fill: false,
                    stepped: true
                },
                {
                    label: 'Growth actual',
                    data: [600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810, 780],
                    backgroundColor: getComputedStyle(document.body).getPropertyValue('--primary-color') || '#ec4dbc',
                    type: 'bar',
                    barPercentage: 0.5
                }
            ]
        };
    };
    const getCountryChart = (documentStyle: CSSStyleDeclaration): ChartData<'pie'> => {
        return {
            labels: ['RUS', 'Other', 'IND', 'AUS', 'JPN', 'USA', 'CHN'],
            datasets: [
                {
                    data: [30, 18, 36, 54, 61, 90, 72],
                    backgroundColor: ['#0F8BFD', '#545C6B', '#EC4DBC', '#EEE500', '#FC6161', '#00D0DE', '#873EFE'],
                    hoverBackgroundColor: ['#0F8BFD', '#545C6B', '#EC4DBC', '#EEE500', '#FC6161', '#00D0DE', '#873EFE'],
                    borderColor: 'transparent'
                }
            ]
        };
    };
    const getRevenueChart = (documentStyle: CSSStyleDeclaration): ChartData<'line'> => {
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Sales',
                    data: [37, 34, 21, 27, 10, 18, 15],
                    borderColor: '#EEE500',
                    pointBackgroundColor: '#EEE500',
                    backgroundColor: 'rgba(238, 229, 0, 0.05)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Revenue',
                    data: [31, 27, 30, 37, 23, 29, 20],
                    borderColor: '#00D0DE',
                    pointBackgroundColor: '#00D0DE',
                    backgroundColor: 'rgba(0, 208, 222, 0.05)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Expenses',
                    data: [21, 7, 13, 3, 19, 11, 6],
                    borderColor: '#FC6161',
                    pointBackgroundColor: '#FC6161',
                    backgroundColor: 'rgba(253, 72, 74, 0.05)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Customer',
                    data: [47, 31, 35, 20, 46, 39, 25],
                    borderColor: '#0F8BFD',
                    pointBackgroundColor: '#0F8BFD',
                    backgroundColor: 'rgba(15, 139, 253, 0.05)',
                    fill: true,
                    tension: 0.4
                }
            ]
        };
    };
    const getCustomerChart = (documentStyle: CSSStyleDeclaration): ChartData<'bar'> => {
        return {
            labels: ['January', 'March', 'May', 'Agust', 'October', 'December'],
            datasets: [
                {
                    data: [10, 25, 48, 35, 54, 70],
                    backgroundColor: documentStyle.getPropertyValue('--primary-300') || '#f391d5',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [18, 35, 23, 30, 59, 65],
                    backgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-500') || '#ec4dbc',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [20, 47, 46, 46, 61, 70],
                    backgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-500') || '#ec4dbc',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [17, 34, 18, 48, 67, 68],
                    backgroundColor: documentStyle.getPropertyValue('--primary-500') || '#ec4dbc',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-600') || '#c941a0',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [9, 37, 47, 50, 60, 62],
                    backgroundColor: documentStyle.getPropertyValue('--primary-300') || '#f391d5',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [8, 48, 40, 52, 72, 75],
                    backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#f7b2e2',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-300') || '#f391d5',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [10, 18, 50, 47, 63, 80],
                    backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#f7b2e2',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-300') || '#f391d5',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [20, 36, 39, 58, 59, 85],
                    backgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-500') || '#ec4dbc',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [30, 45, 35, 50, 54, 81],
                    backgroundColor: documentStyle.getPropertyValue('--primary-300') || '#f391d5',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [28, 35, 52, 56, 60, 77],
                    backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#f7b2e2',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-300') || '#f391d5',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [40, 40, 38, 45, 68, 86],
                    backgroundColor: documentStyle.getPropertyValue('--primary-500') || '#ec4dbc',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-600') || '#c941a0',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [50, 23, 27, 34, 65, 90],
                    backgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-500') || '#ec4dbc',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [29, 27, 29, 42, 55, 84],
                    backgroundColor: documentStyle.getPropertyValue('--primary-300') || '#f391d5',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [10, 37, 47, 29, 59, 80],
                    backgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-500') || '#ec4dbc',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [10, 54, 42, 38, 63, 83],
                    backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#f7b2e2',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-300') || '#f391d5',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [25, 44, 50, 56, 65, 92],
                    backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#f7b2e2',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-300') || '#f391d5',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [30, 43, 48, 45, 73, 78],
                    backgroundColor: documentStyle.getPropertyValue('--primary-300') || '#f391d5',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                },
                {
                    data: [29, 47, 54, 60, 77, 86],
                    backgroundColor: documentStyle.getPropertyValue('--primary-400') || '#f06fc9',
                    hoverBackgroundColor: documentStyle.getPropertyValue('--primary-500') || '#ec4dbc',
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                }
            ]
        };
    };

    const { layoutConfig } = useContext(LayoutContext);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#ffffff';
        visitorChart = getVisitorChart(documentStyle);
        customerChart = getCustomerChart(documentStyle);
        revenueChart = getRevenueChart(documentStyle);
        countryChart = getCountryChart(documentStyle);
        setVisitorChartOptions({
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: textColor
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    ticks: {
                        color: textColor
                    },
                    min: 500,
                    max: 900,
                    grid: {
                        display: false
                    }
                },
                x: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        display: false
                    }
                }
            }
        });
        setCustomerChartOptions({
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        color: textColor
                    },
                    display: false
                },
                x: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        display: false
                    }
                }
            }
        });
        setRevenueChartOptions({
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            hover: {
                mode: 'index'
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor
                    }
                },
                y: {
                    ticks: {
                        color: textColor,
                        stepSize: 5
                    }
                }
            }
        });
        setCountryChartOptions({
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        });
    }, [layoutConfig]);

    const orderYear = [
        { name: '2021', code: '0' },
        { name: '2020', code: '1' }
    ];
    const visitorYear = [
        { name: '2020', code: '0' },
        { name: '2019', code: '1' }
    ];
    const customerYear = [
        { name: '2021', code: '0' },
        { name: '2022', code: '1' }
    ];
    const revenueMonth = [
        { name: 'January - July 2021', code: '0' },
        { name: 'August - December 2020', code: '1' }
    ];

    const [customersTable, setCustomersTable] = useState<any>(null);
    const [customersTable1, setCustomersTable1] = useState<any>(null);
    const [customersTable2, setCustomersTable2] = useState<any>(null);
    const [selectedVisitorYear, setSelectedVisitorYear] = useState(visitorYear[0]);
    const [selectedRevenueMonth, setSelectedRevenueMonth] = useState(revenueMonth[0]);
    const [selectedOrderYear, setSelectedOrderYear] = useState(orderYear[0]);
    const [selectedCustomerYear, setSelectedCustomerYear] = useState(customerYear[0]);
    const [customerCarousel, setCustomerCarousel] = useState<Array<any>>([]);

    const visitor = useRef<any>(null);
    const customer = useRef<any>(null);
    const revenue = useRef<any>(null);
    const dt = useRef<any>(null);

    let growth = '$620,076';
    let avgCustomer = '$1,120';

    const timelineEvents = [
        {
            transaction: 'Payment from #28492',
            amount: '+$250.00',
            date: 'June 13, 2020 11:09 AM',
            icon: 'pi pi-check',
            iconColor: '#0F8BFD',
            amountColor: '#00D0DE'
        },
        {
            transaction: 'Process refund to #94830',
            amount: '-$570.00',
            date: 'June 13, 2020 08:22 AM',
            icon: 'pi pi-refresh',
            iconColor: '#FC6161',
            amountColor: '#FC6161'
        },
        {
            transaction: 'New 8 user to #5849',
            amount: '+$50.00',
            date: 'June 12, 2020 02:56 PM',
            icon: 'pi pi-plus',
            iconColor: '#0BD18A',
            amountColor: '#0BD18A'
        },
        {
            transaction: 'Payment from #3382',
            amount: '+$3830.00',
            date: 'June 11, 2020 06:11 AM',
            icon: 'pi pi-check',
            iconColor: '#0F8BFD',
            amountColor: '#00D0DE'
        },
        {
            transaction: 'Payment from #4738',
            amount: '+$845.00',
            date: 'June 11, 2020 03:50 AM',
            icon: 'pi pi-check',
            iconColor: '#0F8BFD',
            amountColor: '#00D0DE'
        },
        {
            transaction: 'Payment failed form #60958',
            amount: '$1450.00',
            date: 'June 10, 2020 07:54 PM',
            icon: 'pi pi-exclamation-triangle',
            iconColor: '#EC4DBC',
            amountColor: '#EC4DBC'
        },
        {
            transaction: 'Payment from #5748',
            amount: '+$50.00',
            date: 'June 09, 2020 11:37 PM',
            icon: 'pi pi-check',
            iconColor: '#0F8BFD',
            amountColor: '#00D0DE'
        },
        {
            transaction: 'Removed 32 users from #5849',
            amount: '-$240.00',
            date: 'June 09, 2020 08:40 PM',
            icon: 'pi pi-minus',
            iconColor: '#FC6161',
            amountColor: '#FC6161'
        }
    ];

    const carouselResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    let customerMax = '1232';
    let customerMin = '284';
    let customerAvg = '875';

    useEffect(() => {
        CustomerService.getCustomersLarge().then((customers) => {
            const _customersTable = customers.map((customer: any) => {
                let date = new Date(customer.date);
                return { ...customer, date };
            });
            setCustomersTable(_customersTable);
        });

        CustomerService.getCustomersLarge().then((customers) => {
            const _customersTable1 = customers.map((customer: any) => {
                let date = new Date(customer.date);
                return { ...customer, date };
            });
            setCustomersTable1(_customersTable1);
        });

        CustomerService.getCustomersMixed().then((customers) => {
            const _customersTable2 = customers.map((customer: any) => {
                let date = new Date(customer.date);
                return { ...customer, date };
            });
            setCustomersTable2(_customersTable2);
        });

        setCustomerCarousel([
            { user: '9,673 Users', value: '$8,362,478', image: 'nasa' },
            { user: '9,395 Users', value: '$7,927,105', image: 'beats' },
            { user: '7,813 Users', value: '$6,471,594', image: 'gopro' },
            { user: '7,613 Users', value: '$5,697,883', image: 'north' },
            { user: '98,673 Users', value: '$7,653,311', image: 'mc' },
            { user: '5,645 Users', value: '$4,567,823', image: 'dell' },
            { user: '5,153 Users', value: '$5,342,678', image: 'wwf' },
            { user: '4,338 Users', value: '$5,867,391', image: 'bmw' },
            { user: '4,170 Users', value: '$4,647,233', image: 'pepsi' },
            { user: '3,765 Users', value: '$4,123,876', image: 'netflix' },
            { user: '3,490 Users', value: '$3,688,362', image: 'deloitte' },
            { user: '2,976 Users', value: '$3,978,478', image: 'pg' }
        ]);
    }, []);

    const changeRevenueChart = (event: any) => {
        setSelectedRevenueMonth(event.value);
        const dataSet1 = [
            [37, 34, 21, 27, 10, 18, 15],
            [31, 27, 30, 37, 23, 29, 20],
            [21, 7, 13, 3, 19, 11, 6],
            [47, 31, 35, 20, 46, 39, 25]
        ];
        const dataSet2 = [
            [31, 27, 30, 37, 23, 29, 20],
            [47, 31, 35, 20, 46, 39, 25],
            [37, 34, 21, 27, 10, 18, 15],
            [21, 7, 13, 3, 19, 11, 6]
        ];

        if (event.value.code === '1') {
            revenueChart.datasets[0].data = dataSet2[parseInt('0')];
            revenueChart.datasets[1].data = dataSet2[parseInt('1')];
            revenueChart.datasets[2].data = dataSet2[parseInt('2')];
            revenueChart.datasets[3].data = dataSet2[parseInt('3')];
        } else {
            revenueChart.datasets[0].data = dataSet1[parseInt('0')];
            revenueChart.datasets[1].data = dataSet1[parseInt('1')];
            revenueChart.datasets[2].data = dataSet1[parseInt('2')];
            revenueChart.datasets[3].data = dataSet1[parseInt('3')];
        }

        revenue.current.refresh();
    };

    const changeVisitorChart = (event: any) => {
        setSelectedVisitorYear(event.value);
        const dataSet1 = [
            [630, 630, 695, 695, 695, 760, 760, 760, 840, 840, 840, 840],
            [600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810, 780]
        ];
        const dataSet2 = [
            [580, 580, 620, 620, 620, 680, 680, 680, 730, 730, 730, 730],
            [550, 592, 600, 605, 630, 649, 660, 690, 710, 720, 730, 780]
        ];

        if (event.value.code === '1') {
            growth = '$581,259';
            avgCustomer = '$973';
            visitorChart.datasets[0].data = dataSet2[parseInt('0')];
            visitorChart.datasets[1].data = dataSet2[parseInt('1')];
        } else {
            growth = '$620,076';
            avgCustomer = '$1,120';
            visitorChart.datasets[0].data = dataSet1[parseInt('0')];
            visitorChart.datasets[1].data = dataSet1[parseInt('1')];
        }

        visitor.current.refresh();
    };

    const changeCustomerChart = (event: any) => {
        setSelectedCustomerYear(event.value);
        const dataSet1 = [
            [10, 25, 48, 35, 54, 70],
            [18, 35, 23, 30, 59, 65],
            [20, 47, 46, 46, 61, 70],
            [17, 34, 18, 48, 67, 68],
            [9, 37, 47, 50, 60, 62],
            [8, 48, 40, 52, 72, 75],
            [10, 18, 50, 47, 63, 80],
            [20, 36, 39, 58, 59, 85],
            [30, 45, 35, 50, 54, 81],
            [28, 35, 52, 56, 60, 77],
            [40, 40, 38, 45, 68, 86],
            [50, 23, 27, 34, 65, 90],
            [29, 27, 29, 42, 55, 84],
            [10, 37, 47, 29, 59, 80],
            [10, 54, 42, 38, 63, 83],
            [25, 44, 50, 56, 65, 92],
            [30, 43, 48, 45, 73, 78],
            [29, 47, 54, 60, 77, 86]
        ];
        const dataSet2 = [
            [10, 25, 48, 35, 54, 70],
            [20, 47, 46, 46, 61, 70],
            [17, 34, 18, 48, 67, 68],
            [50, 23, 27, 34, 65, 90],
            [8, 48, 40, 52, 72, 75],
            [9, 37, 47, 50, 60, 62],
            [10, 18, 50, 47, 63, 80],
            [30, 45, 35, 50, 54, 81],
            [10, 37, 47, 29, 59, 80],
            [28, 35, 52, 56, 60, 77],
            [25, 44, 50, 56, 65, 92],
            [18, 35, 23, 30, 59, 65],
            [20, 36, 39, 58, 59, 85],
            [29, 27, 29, 42, 55, 84],
            [40, 40, 38, 45, 68, 86],
            [30, 43, 48, 45, 73, 78],
            [10, 54, 42, 38, 63, 83],
            [29, 47, 54, 60, 77, 86]
        ];

        if (event.value.code === '1') {
            customerAvg = '621';
            customerMin = '198';
            customerMax = '957';
            customerChart.datasets[0].data = dataSet2[parseInt('0')];
            customerChart.datasets[1].data = dataSet2[parseInt('1')];
            customerChart.datasets[2].data = dataSet2[parseInt('2')];
            customerChart.datasets[3].data = dataSet2[parseInt('3')];
            customerChart.datasets[4].data = dataSet2[parseInt('4')];
            customerChart.datasets[5].data = dataSet2[parseInt('5')];
            customerChart.datasets[6].data = dataSet2[parseInt('6')];
            customerChart.datasets[7].data = dataSet2[parseInt('7')];
            customerChart.datasets[8].data = dataSet2[parseInt('8')];
            customerChart.datasets[9].data = dataSet2[parseInt('9')];
            customerChart.datasets[10].data = dataSet2[parseInt('10')];
            customerChart.datasets[11].data = dataSet2[parseInt('11')];
            customerChart.datasets[12].data = dataSet2[parseInt('12')];
            customerChart.datasets[13].data = dataSet2[parseInt('13')];
            customerChart.datasets[14].data = dataSet2[parseInt('14')];
            customerChart.datasets[15].data = dataSet2[parseInt('15')];
            customerChart.datasets[16].data = dataSet2[parseInt('16')];
            customerChart.datasets[17].data = dataSet2[parseInt('17')];
        } else {
            customerAvg = '875';
            customerMin = '284';
            customerMax = '1232';
            customerChart.datasets[0].data = dataSet1[parseInt('0')];
            customerChart.datasets[1].data = dataSet1[parseInt('1')];
            customerChart.datasets[2].data = dataSet1[parseInt('2')];
            customerChart.datasets[3].data = dataSet1[parseInt('3')];
            customerChart.datasets[4].data = dataSet1[parseInt('4')];
            customerChart.datasets[5].data = dataSet1[parseInt('5')];
            customerChart.datasets[6].data = dataSet1[parseInt('6')];
            customerChart.datasets[7].data = dataSet1[parseInt('7')];
            customerChart.datasets[8].data = dataSet1[parseInt('8')];
            customerChart.datasets[9].data = dataSet1[parseInt('9')];
            customerChart.datasets[10].data = dataSet1[parseInt('10')];
            customerChart.datasets[11].data = dataSet1[parseInt('11')];
            customerChart.datasets[12].data = dataSet1[parseInt('12')];
            customerChart.datasets[13].data = dataSet1[parseInt('13')];
            customerChart.datasets[14].data = dataSet1[parseInt('14')];
            customerChart.datasets[15].data = dataSet1[parseInt('15')];
            customerChart.datasets[16].data = dataSet1[parseInt('16')];
            customerChart.datasets[17].data = dataSet1[parseInt('17')];
        }

        customer.current.refresh();
    };

    const recentSales = (event: any) => {
        setSelectedOrderYear(event.value);
        if (event.value.code === '0') {
            setCustomersTable(customersTable1);
        } else {
            setCustomersTable(customersTable2);
        }
    };

    const formatDate = (value: any) => {
        return (
            <>
                <span className="p-column-title">Date</span>
                {value.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </>
        );
    };

    const formatCurrency = (value: any) => {
        return (
            <>
                <span className="p-column-title">Balance</span>
                {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </>
        );
    };

    const representativeTemplate = (data: any) => {
        return (
            <>
                <span className="p-column-title">Agent</span>
                <img alt={data.representative.name} src={'demo/images/avatar/' + data.representative.image} width={24} className="mr-2" style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{data.representative.name}</span>
            </>
        );
    };

    const actionTemplate = () => {
        return (
            <>
                <Button className="p-button-text" icon="pi pi-copy"></Button>
                <Button className="p-button-text" icon="pi pi-pencil"></Button>
                <Button className="p-button-text" icon="pi pi-ellipsis-h"></Button>
            </>
        );
    };

    const countryTemplate = (data: any, props: any) => {
        return (
            <>
                <span className="p-column-title">{props.header}</span>
                <span className="ml-2" style={{ verticalAlign: 'middle' }}>
                    {data.country.name}
                </span>
            </>
        );
    };

    const itemTemplate = (customer: any) => {
        return (
            <div className="card mr-4">
                <div className="customer-item-content text-center">
                    <div className="mb-6">
                        <img src={`/demo/images/ecommerce-dashboard/${customer.image}.png`} alt={customer.image} className="product-image" />
                    </div>
                    <div>
                        <h4>{customer.user}</h4>
                        <h5 className="mt-0 mb-3 text-color-secondary">{customer.value}</h5>
                    </div>
                </div>
            </div>
        );
    };

    const marker = (item: any) => {
        return (
            <span className="custom-marker border-circle p-1 w-2rem h-2rem flex justify-content-center align-items-center" style={{ backgroundColor: item.iconColor }}>
                <i className={item.icon}></i>
            </span>
        );
    };

    const content = (item: any) => {
        return (
            <>
                <div className="flex align-items-center justify-content-between">
                    <p className="m-0">{item.transaction}</p>
                    <h6 className="m-0" style={{ color: item.amountColor }}>
                        {' '}
                        {item.amount}
                    </h6>
                </div>
                <span className="text-sm text-color-secondary">{item.date}</span>
            </>
        );
    };

    return (
        <div className="grid">
            <div className="col-12 md:col-4">
                <div className="card relative h-6rem border-round-xl p-3">
                    <span className="text-sm font-medium line-height-1">CONVERSATION RATE</span>
                    <div className="flex justify-content-between">
                        <div className="flex justify-content-between align-items-center">
                            <div
                                className="flex justify-content-center align-items-center h-2rem w-5rem border-round p-2 mr-3"
                                style={{
                                    backgroundColor: '#fc6161',
                                    boxShadow: '0px 6px 20px rgba(252, 97, 97, 0.3)'
                                }}
                            >
                                <i className="pi pi-arrow-down w-2rem"></i>
                                <span className="line-height-2">0.6%</span>
                            </div>
                            <div className="line-height-4 text-4xl">0.81%</div>
                        </div>
                    </div>
                    <img className="absolute" style={{ bottom: '14px', right: '12px' }} src="/demo/images/ecommerce-dashboard/rate.svg" alt="Rate" />
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="card relative h-6rem border-round-xl p-3">
                    <span className="text-sm font-medium line-height-1">AVG. ORDER VALUE</span>
                    <div className="flex justify-content-between">
                        <div className="flex justify-content-between align-items-center">
                            <div
                                className="flex justify-content-center align-items-center h-2rem w-5rem border-round p-2 mr-3"
                                style={{
                                    marginRight: '12px',
                                    backgroundColor: '#0bd18a',
                                    boxShadow: '0px 6px 20px rgba(11, 209, 138, 0.3)'
                                }}
                            >
                                <i className="pi pi-arrow-up w-2rem"></i>
                                <span className="line-height-2">4.2%</span>
                            </div>
                            <div className="line-height-4 text-4xl">$306.2</div>
                        </div>
                    </div>
                    <img className="absolute" style={{ bottom: '14px', right: '12px' }} src="demo/images/ecommerce-dashboard/value.svg" alt="Value" />
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="card relative h-6rem border-round-xl p-3">
                    <span className="text-sm font-medium line-height-1">AVG. ORDER VALUE</span>
                    <div className="flex justify-content-between">
                        <div className="flex justify-content-between align-items-center">
                            <div
                                className="flex justify-content-center align-items-center h-2rem w-5rem border-round p-2 mr-3"
                                style={{
                                    marginRight: '12px',
                                    backgroundColor: '#0bd18a',
                                    boxShadow: '0px 6px 20px rgba(11, 209, 138, 0.3)'
                                }}
                            >
                                <i className="pi pi-arrow-up w-2rem"></i>
                                <span className="line-height-2">4.2%</span>
                            </div>
                            <div className="line-height-4 text-4xl">$306.2</div>
                        </div>
                    </div>
                    <img className="absolute" style={{ bottom: '14px', right: '12px' }} src="demo/images/ecommerce-dashboard/value.svg" alt="Value" />
                </div>
            </div>

            <div className="col-12 md:col-8">
                <div className="card widget-visitor-graph">
                    <div className="card-header line-height-4">
                        <span>Unique visitor graph</span>
                        <Dropdown options={visitorYear} value={selectedVisitorYear} optionLabel="name" onChange={changeVisitorChart}></Dropdown>
                    </div>

                    <div className="graph-content grid mt-4">
                        <div className="col-12 md:col-6">
                            <h2>{growth}</h2>
                            <h6 className="mt-3">MRR GROWTH</h6>
                            <p className="text-color-secondary">
                                Measure how fast you’re growing monthly recurring revenue.{' '}
                                <a href="#" className="text-primary hover:text-primary-400 transition-duration-200">
                                    Learn more
                                </a>
                            </p>
                        </div>
                        <div className="col-12 md:col-6">
                            <h2>{avgCustomer}</h2>
                            <h6 className="mt-3">AVG. MRR/CUSTOMER</h6>
                            <p className="text-color-secondary">
                                The revenue generated per account on a monthly or yearly basis.{' '}
                                <a href="#" className="text-primary hover:text-primary-400 transition-duration-200">
                                    Learn more
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="graph">
                        <h6 className="mt-4">Revenue</h6>

                        <Chart ref={visitor} height="355" type="bar" data={visitorChart} options={visitorChartOptions} id="visitor-chart"></Chart>
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card p-0">
                    <div className="timeline-header p-3 flex justify-content-between align-items-center">
                        <p className="m-0">Transaction history</p>
                        <div className="header-icons">
                            <i className="pi pi-refresh ml-2"></i>
                            <i className="pi pi-filter ml-2"></i>
                        </div>
                    </div>
                    <div className="timeline-content pb-3">
                        <Timeline value={timelineEvents} marker={marker} content={content} className="custom-timeline py-0 px-3" />
                    </div>
                    <div className="timeline-footer border-top-1 surface-border p-3 flex align-items-center justify-content-center">
                        <a href="#" className="text-primary hover:text-primary-400 transition-duration-200">
                            View all transactions<i className="pi pi-arrow-down"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="card ">
                    <div className="font-medium line-height-4">Country distrubutions</div>
                    <div className="country-graph">
                        <div className="flex justify-content-center">
                            <Chart type="doughnut" id="country-chart" data={countryChart} options={countryChartOptions} style={{ position: 'relative', width: '75%' }}></Chart>
                        </div>
                    </div>
                    <div className="country-content">
                        <ul className="m-0 p-0 border-none outline-none list-none">
                            <li className="flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                                <div className="flex justify-content-between align-items-center">
                                    <div className="w-2rem h-2rem border-round mr-2" style={{ backgroundColor: 'var(--cyan-400)', boxShadow: '0px 0px 10px rgba(0, 208, 222, 0.3)' }}></div>
                                    <span>United States of America</span>
                                </div>
                                <span>25%</span>
                            </li>
                            <li className="flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                                <div className="flex justify-content-between align-items-center">
                                    <div className="w-2rem h-2rem border-round mr-2" style={{ backgroundColor: 'var(--purple-400)', boxShadow: '0px 0px 10px rgba(135, 62, 254, 0.3)' }}></div>
                                    <span>China</span>
                                </div>
                                <span>20%</span>
                            </li>
                            <li className="flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                                <div className="flex justify-content-between align-items-center">
                                    <div className="w-2rem h-2rem border-round mr-2" style={{ backgroundColor: 'var(--red-400)', boxShadow: '0px 0px 10px rgba(252, 97, 97, 0.3)' }}></div>
                                    <span>Japan</span>
                                </div>
                                <span>17%</span>
                            </li>
                            <li className="flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                                <div className="flex justify-content-between align-items-center">
                                    <div className="w-2rem h-2rem border-round mr-2" style={{ backgroundColor: 'var(--yellow-400)', boxShadow: '0px 0px 10px rgba(238, 229, 0, 0.3)' }}></div>
                                    <span>Australia</span>
                                </div>
                                <span>15%</span>
                            </li>
                            <li className="flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                                <div className="flex justify-content-between align-items-center">
                                    <div className="w-2rem h-2rem border-round mr-2" style={{ backgroundColor: 'var(--pink-400)', boxShadow: '0px 0px 10px rgba(236, 77, 188, 0.3)' }}></div>
                                    <span>India</span>
                                </div>
                                <span>10%</span>
                            </li>
                            <li className="flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                                <div className="flex justify-content-between align-items-center">
                                    <div className="w-2rem h-2rem border-round mr-2" style={{ backgroundColor: 'var(--blue-400)', boxShadow: '0px 0px 10px rgba(15, 139, 253, 0.3)' }}></div>
                                    <span>Rusian Federation</span>
                                </div>
                                <span>8%</span>
                            </li>
                            <li className="flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                                <div className="flex justify-content-between align-items-center">
                                    <div className="w-2rem h-2rem border-round mr-2" style={{ backgroundColor: 'var(--gray-400)' }}></div>
                                    <span>Others</span>
                                </div>
                                <span>5%</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-8">
                <div className="card">
                    <div className="card-header line-height-4">
                        <span>Monthly revenue</span>
                        <Dropdown options={revenueMonth} value={selectedRevenueMonth} optionLabel="name" onChange={changeRevenueChart}></Dropdown>
                    </div>

                    <div className="graph">
                        <Chart ref={revenue} type="line" height="430" id="revenue-chart" data={revenueChart} options={revenueChartOptions}></Chart>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-8">
                <div className="card widget-table">
                    <div className="card-header">
                        <span>Yearly win</span>
                        <Dropdown options={orderYear} value={selectedOrderYear} optionLabel="name" onChange={recentSales}></Dropdown>
                    </div>
                    <DataTable className="p-datatable-customers" ref={dt} value={customersTable} dataKey="id" rowHover rows={10} paginator>
                        <Column field="representative.name" header="Agent" sortable body={representativeTemplate} style={{ minWidth: '14rem' }}></Column>
                        <Column field="country.name" header="Country" sortable body={countryTemplate} style={{ minWidth: '10rem' }}></Column>
                        <Column field="date" header="Date" sortable body={(data) => formatDate(data.date)}></Column>
                        <Column field="balance" header="Balance" sortable body={(data) => formatCurrency(data.balance)}></Column>
                        <Column headerStyle={{ width: '8em' }} bodyStyle={{ textAlign: 'center' }} body={actionTemplate}></Column>
                    </DataTable>
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="card widget-performance">
                    <div className="header line-height-4 font-medium">
                        <span>Quarterly win</span>
                        <p className="text-sm text-color-secondary">Top performances</p>
                    </div>
                    <div className="content">
                        <ul className="p-0 m-0 list-none">
                            <li className="py-3 px-0 flex align-items-center">
                                <Avatar image="/demo/images/ecommerce-dashboard/ann.png" className="mr-2 p-overlay-badge" shape="circle">
                                    <Badge value={1} />
                                </Avatar>
                                <div className="ml-2">
                                    <div className="amount">$94,815</div>
                                    <div className="name">Ann Vaccaro</div>
                                </div>
                            </li>
                            <li className="py-3 px-0 flex align-items-center">
                                <Avatar image="demo/images/ecommerce-dashboard/miracle.png" className="mr-2 p-overlay-badge" shape="circle">
                                    <Badge value={2} />
                                </Avatar>
                                <div className="ml-2">
                                    <div className="amount">$78,985</div>
                                    <div className="name">Miracle Aminoff</div>
                                </div>
                            </li>
                            <li className="py-3 px-0 flex align-items-center">
                                <Avatar image="demo/images/ecommerce-dashboard/kaylynn.png" className="mr-2 p-overlay-badge" shape="circle">
                                    <Badge value={3} />
                                </Avatar>
                                <div className="ml-2">
                                    <div className="amount">$53,611</div>
                                    <div className="name">Kaylynn Geidt</div>
                                </div>
                            </li>
                            <li className="py-3 px-0 flex align-items-center">
                                <Avatar image="demo/images/ecommerce-dashboard/angel.png" className="mr-2 p-overlay-badge" shape="circle">
                                    <Badge value={4} />
                                </Avatar>
                                <div className="ml-2">
                                    <div className="amount">$25,338</div>
                                    <div className="name">Angel Rosser</div>
                                </div>
                            </li>
                            <li className="py-3 px-0 flex align-items-center">
                                <Avatar image="demo/images/ecommerce-dashboard/cristofer.png" className="mr-2 p-overlay-badge" shape="circle">
                                    <Badge value={5} />
                                </Avatar>
                                <div className="ml-2">
                                    <div className="amount">$15,989</div>
                                    <div className="name">Cristofer Mango</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-8">
                <div className="card widget-customer-graph">
                    <div className="header">
                        <div className="flex justify-content-between line-height-4">
                            <span>Weekly new customers</span>
                            <Dropdown options={customerYear} value={selectedCustomerYear} optionLabel="name" onChange={changeCustomerChart}></Dropdown>
                        </div>
                        <p className="text-sm text-color-secondary">Number of new customer are listed by weekly</p>
                    </div>

                    <div className="content grid p-nogutter mt-3">
                        <div className="col-12 md:col-6 grid">
                            <div className="col-12 md:col-4 flex align-items-center">
                                <h2 className="mb-0">{customerMax}</h2>
                                <p className="ml-2 text-color-secondary text-sm line-height-1">MAX</p>
                            </div>
                            <div className="col-12 md:col-4 flex align-items-center">
                                <h2>{customerMin}</h2>
                                <p className="ml-2 text-color-secondary text-sm line-height-1">MIN</p>
                            </div>
                            <div className="col-12 md:col-4 flex align-items-center">
                                <h2 style={{ color: '#FC6161' }}>{customerAvg}</h2>
                                <p className="ml-2 text-color-secondary text-sm line-height-1">AVERAGE</p>
                            </div>
                        </div>
                    </div>

                    <Chart ref={customer} type="bar" id="customer-chart" height="450" data={customerChart} options={customerChartOptions}></Chart>
                </div>
            </div>
            <div className="col-12 lg:col-4">
                <div className="card widget-target">
                    <div className="card-header">
                        <span>Weekly target</span>
                    </div>
                    <div className="content">
                        <h3 className="mt-3 mb-0">1232 Users</h3>
                        <span className="text-sm line-height-1 text-green-500">
                            %3.5 <i className="pi pi-arrow-up text-sm"></i>
                            <span className="text-color-secondary"> than last week</span>
                        </span>
                    </div>
                    <div className="mt-4 relative text-red-500 flex flex-column justify-content-between" style={{ minHeight: '235px' }}>
                        <div className="item mb-3">
                            <span className="block mb-1">51%</span>
                            <ProgressBar value={51} showValue={false} color="#FC6161"></ProgressBar>
                            <span className="day bottom-0 text-color-secondary block mt-1">Thu</span>
                        </div>
                        <div className="item mb-3">
                            <span className="block mb-1">68%</span>
                            <ProgressBar value={68} showValue={false} color="#FC6161"></ProgressBar>
                            <span className="day bottom-0 text-color-secondary block mt-1">Fri</span>
                        </div>
                        <div className="item mb-3">
                            <span className="block mb-1">74%</span>
                            <ProgressBar value={74} showValue={false} color="#FC6161"></ProgressBar>
                            <span className="day bottom-0 text-color-secondary block mt-1">Sat</span>
                        </div>
                        <div className="item mb-3">
                            <span className="block mb-1">61%</span>
                            <ProgressBar value={61} showValue={false} color="#FC6161"></ProgressBar>
                            <span className="day bottom-0 text-color-secondary block mt-1">Sun</span>
                        </div>
                        <div className="item success mb-3">
                            <span className="block mb-1 text-green-500">100%</span>
                            <ProgressBar value={100} showValue={false} color="#0BD18A" style={{ boxShadow: '0px 0px 10px rgb(11 209 138 / 30%)' }}></ProgressBar>
                            <span className="day bottom-0 text-color-secondary block mt-1">Mon</span>
                        </div>
                        <div className="item mb-3">
                            <span className="block mb-1">70%</span>
                            <ProgressBar value={70} showValue={false} color="#FC6161"></ProgressBar>
                            <span className="day bottom-0 text-color-secondary block mt-1">Tue</span>
                        </div>
                        <div className="item today mb-3">
                            <span className="block mb-1">22%</span>
                            <ProgressBar value={22} showValue={false} color="#FC6161"></ProgressBar>
                            <span className="day bottom-0 text-color block mt-1">Today</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 widget-customer-carousel">
                <h6>Top customers</h6>
                <Carousel value={customerCarousel} numVisible={4} numScroll={1} responsiveOptions={carouselResponsiveOptions} circular itemTemplate={itemTemplate} showIndicators={false} />
            </div>
        </div>
    );
};

export default Dashboard;
