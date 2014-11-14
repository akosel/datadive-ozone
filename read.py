
# coding: utf-8

# In[ ]:

import csv
import copy
import os
import datetime
import dateutil
import pandas as pd
import numpy as np

dateFormat = '%m/%d/%Y'


# In[580]:

np.sum.__name__.capitalize()


# In[581]:

master = pd.read_csv('public/data/all.csv', parse_dates=True, index_col=['Date'])
master = master.fillna(0)


# In[582]:

def groupAggAndWrite(dataset, groupArr, aggregatorArr=[np.sum, np.mean]):
    groupCaps = [group.capitalize() for group in groupArr]
    groupString = ''.join(groupCaps)
    
    for agg in aggregatorArr:
        filename = ''.join(['groupBy', groupString, agg.__name__.capitalize(), '.csv'])
        path = os.path.join('public/data', filename)

        groupBy = dataset.groupby(groupArr).aggregate(agg)
        groupBy[1:].to_csv(path)
    


# In[583]:

data = copy.deepcopy(master)

data['weekday'] = data.index.weekday
groupAggAndWrite(data, ['weekday'])


# In[584]:

data = copy.deepcopy(master)

data['weekday'] = data.index.weekday
data['year'] = data.index.year
groupAggAndWrite(data, ['year', 'weekday'])


# In[585]:

data = copy.deepcopy(master)

data['week'] = data.index.week
data['year'] = data.index.year
groupAggAndWrite(data, ['year', 'week'])


# In[586]:

data = copy.deepcopy(master)

data['year'] = data.index.year
groupAggAndWrite(data, ['year'])


# In[587]:

data = copy.deepcopy(master)

data['month'] = data.index.month
groupAggAndWrite(data, ['month'])


# In[588]:

data = copy.deepcopy(master)

data['week'] = data.index.week
groupAggAndWrite(data, ['week'])


# In[589]:

data = copy.deepcopy(master)

data['month'] = data.index.month
data['year'] = data.index.year
groupAggAndWrite(data, ['year', 'month'])


# In[590]:

master.count()


# In[591]:

# http://pandas.pydata.org/pandas-docs/version/0.15.0/generated/pandas.DatetimeIndex.html
# the link above is an extremely useful resource for finding what
# options are available for grouping

