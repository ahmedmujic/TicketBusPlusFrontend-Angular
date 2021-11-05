export interface AnalyticsIncome{
    income: number;
    lastMonthIncome: number;
    lastYearIncome: number;
}

export interface MonthAnalytics{
    month: number,
    income: number
}

export interface CountryAnalytics{
    countryName: string,
    income: number
}