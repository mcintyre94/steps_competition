enum Metric {
    Steps = 'steps',
    Name = 'name',
    DayOfWeek = 'dayOfWeek',
  }
  
  enum GraphType {
    MultiLine = 'Multi Line',
    BarChart = 'Bar Chart',
  }

  enum Aggregation {
    Avg = 'Avg',
    Sum = 'Sum',
  }
  
  enum Time {
    Start = '08/24/2021 11:00 am',
    FourWeeksAgo = '4 weeks ago',
    SevenDaysAgo = '7 days ago',
    Now = 'now',
  }
  
  enum Granularity {
    Day = 'Day',
  }
  
  enum Timezone {
    UTC = 'Etc/UTC',
  }
  
  enum Suffix {
    Steps = 'steps'
  }
  
  type GraphJSONCustomizations = {
    hideMissing: boolean,
    hideSummary: boolean,
    hideToolTip: boolean,
    showDots: boolean,
    hideXAxis: boolean,
    showYAxis: boolean,
    title: string,
    value_suffix: Suffix
  }
  
  type GraphJSONFilter = [string, string, string]
  
  type GraphJSONPayload = {
    api_key: string,
    IANA_time_zone: string,
    graph_type: GraphType,
    start: Time,
    end: Time,
    compare?: Time,
    filters: GraphJSONFilter[],
    metric: Metric,
    aggregation: Aggregation,
    granularity?: Granularity,
    split?: Metric,
    customizations: GraphJSONCustomizations
  }
  
  type GraphJSONVisualiseIframeResponse = {
    url: string
  }
  
  const projectFilter = (project: string): GraphJSONFilter =>
    ["project", "=", project]

  const dayOfWeekFilter = (dayOfWeek: string): GraphJSONFilter =>
    ["dayOfWeek", "=", dayOfWeek]
  
  const requestIframeURL = async (payload: GraphJSONPayload) => {
    const response = await fetch('https://www.graphjson.com/api/visualize/iframe', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    const jsonResponse: GraphJSONVisualiseIframeResponse = await response.json();
    return jsonResponse.url
  }
  
  export const makeStepsComparisonIframeUrl = async (apiKey: string, stepsProject: string) => {
    const payload: GraphJSONPayload = {
        api_key: apiKey,
        IANA_time_zone: Timezone.UTC,
        graph_type: GraphType.MultiLine,
        start: Time.FourWeeksAgo,
        end: Time.Now,
        filters: [projectFilter(stepsProject)],
        metric: Metric.Steps,
        aggregation: Aggregation.Sum,
        granularity: Granularity.Day,
        split: Metric.Name,
        customizations: {
            hideXAxis: false,
            title: "Steps per day (last 4 weeks)",
            hideSummary: false,
            hideToolTip: false,
            showYAxis: true,
            value_suffix:Suffix.Steps,
            hideMissing: true,
            showDots: true
        }
      };

    console.log(payload)
  
    return requestIframeURL(payload)
  }

  export const makeStepsTotalIframeUrl = async (apiKey: string, stepsProject: string) => {
    const payload: GraphJSONPayload = {
        api_key: apiKey,
        IANA_time_zone: Timezone.UTC,
        graph_type: GraphType.BarChart,
        start: Time.FourWeeksAgo,
        end: Time.Now,
        filters: [projectFilter(stepsProject)],
        metric: Metric.Steps,
        aggregation: Aggregation.Sum,
        split: Metric.Name,
        customizations: {
            hideXAxis: false,
            title: "Total last 4 weeks",
            hideSummary: false,
            hideToolTip: false,
            showYAxis: true,
            value_suffix:Suffix.Steps,
            hideMissing: false,
            showDots: false
        }
      };

    console.log(payload)
  
    return requestIframeURL(payload)
  }

  export const makeDaysOfWeekTotalIframeUrl = async (apiKey: string, stepsProject: string) => {
    const payload: GraphJSONPayload = {
        api_key: apiKey,
        IANA_time_zone: Timezone.UTC,
        graph_type: GraphType.BarChart,
        start: Time.Start,
        end: Time.Now,
        filters: [projectFilter(stepsProject)],
        metric: Metric.Steps,
        aggregation: Aggregation.Sum,
        split: Metric.DayOfWeek,
        customizations: {
            hideXAxis: false,
            title: "Total by day of week (everyone)",
            hideSummary: false,
            hideToolTip: false,
            showYAxis: true,
            value_suffix:Suffix.Steps,
            hideMissing: false,
            showDots: false
        }
      };

    console.log(payload)

    return requestIframeURL(payload)
  }

  export const makeMondayTotalIframeUrl = async (apiKey: string, stepsProject: string) => {
    const payload: GraphJSONPayload = {
        api_key: apiKey,
        IANA_time_zone: Timezone.UTC,
        graph_type: GraphType.BarChart,
        start: Time.Start,
        end: Time.Now,
        filters: [projectFilter(stepsProject), dayOfWeekFilter('Monday')],
        metric: Metric.Steps,
        aggregation: Aggregation.Sum,
        split: Metric.Name,
        customizations: {
            hideXAxis: false,
            title: "Total on Mondays (Monday Motivation)",
            hideSummary: false,
            hideToolTip: false,
            showYAxis: true,
            value_suffix:Suffix.Steps,
            hideMissing: false,
            showDots: false
        }
      };

    console.log(payload)

    return requestIframeURL(payload)
  }