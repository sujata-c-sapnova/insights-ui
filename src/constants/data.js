export const LAMBDA_FUNCTION_URL =
  'https://2lxf4ppacceg4zz765oshujkta0txjxb.lambda-url.ap-south-1.on.aws/'

export const RECENT_STORAGE_KEY =
  'amazon-q-recent-questions'

export const kpiQuestions = [
  {
    id: 'total-sales',
    title: 'Total Sales',
    shortLabel: 'TS',
    description:
      'Current-year sales performance across the business.',
    question: 'Show total sales for current year',
  },
  {
    id: 'revenue-region',
    title: 'Revenue by Region',
    shortLabel: 'RR',
    description:
      'Compare regional revenue and spot strongest markets.',
    question:
      'Show revenue by region for current year',
  },
  {
    id: 'top-customers',
    title: 'Top 10 Customers',
    shortLabel: 'C10',
    description:
      'Identify customers contributing the highest revenue.',
    question:
      'Show top 10 customers by revenue',
  },
  {
    id: 'monthly-growth',
    title: 'Monthly Growth',
    shortLabel: 'MG',
    description:
      'Track month-over-month growth and recent momentum.',
    question:
      'Show monthly sales growth for current year',
  },
  {
    id: 'product-performance',
    title: 'Product Performance',
    shortLabel: 'PP',
    description:
      'Review product-level sales, revenue, and demand trends.',
    question:
      'Show product performance by revenue and sales',
  },
]

export const searchSuggestions = [
  'Which region has the highest revenue this quarter?',
  'Compare sales by product category',
  'Show profit margin trend by month',
  'List underperforming products by sales',
  'Show revenue contribution by customer segment',
  'Find sales variance versus last year',
]