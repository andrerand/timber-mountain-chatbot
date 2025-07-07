# Timber Mountain Neo4j Database - Query Guide

## Database Overview
- **Nodes**: 58
- **Relationships**: 105
- **Node Types**: Entity, ABTest, Document, Feature, Hypothesis, Insight, Metric, Page, Recommendation, Result, Segment

## Basic Exploration Queries

### 1. Show All Node Types and Counts
```cypher
MATCH (n)
RETURN labels(n) as NodeType, count(*) as Count
ORDER BY Count DESC
```
*This query shows you how many nodes of each type exist in your database.*

### 2. Visualize Sample of Everything (Great Starting Point!)
```cypher
MATCH (n)
WITH n LIMIT 25
MATCH (n)-[r]-(m)
RETURN n, r, m
```
*Returns a sample of 25 nodes and all their relationships - perfect for getting oriented.*

### 3. Show Database Schema
```cypher
CALL db.schema.visualization()
```
*Displays the complete database schema showing all node labels and relationship types.*

## A/B Test Exploration Queries

### 4. Show All A/B Tests and Their Direct Connections
```cypher
MATCH (test:ABTest)-[r]-(connected)
RETURN test, r, connected
```
*Visualizes all A/B tests and what they're directly connected to.*

### 5. Explore Specific A/B Test (Example: Homepage Test)
```cypher
MATCH (test:ABTest)-[r*1..2]-(connected)
WHERE test.test_name CONTAINS 'Homepage'
RETURN test, r, connected
```
*Shows a specific test and entities up to 2 relationships away. Change 'Homepage' to explore other tests.*

### 6. List All A/B Tests
```cypher
MATCH (test:ABTest)
RETURN test.test_name as TestName, test.test_launch as LaunchDate, test.test_end as EndDate
ORDER BY test.test_launch DESC
```
*Simple table view of all tests with dates.*

## Relationship-Focused Queries

### 7. Show Test Results and Insights Chain
```cypher
MATCH (test:ABTest)-[:PRODUCED]->(result:Result)
OPTIONAL MATCH (result)-[:INDICATES]->(insight:Insight)
OPTIONAL MATCH (insight)-[:SUGGESTS]->(rec:Recommendation)
RETURN test, result, insight, rec
```
*Traces the complete flow from tests to results to insights to recommendations.*

### 8. Find Hypotheses and Their Validations
```cypher
MATCH (hyp:Hypothesis)<-[:VALIDATES]-(result:Result)
MATCH (result)<-[:PRODUCED]-(test:ABTest)
RETURN hyp, result, test
```
*Shows which hypotheses were validated by which test results.*

### 9. View Metrics and What They Measure
```cypher
MATCH (test:ABTest)-[:MEASURED_BY]->(metric:Metric)
RETURN test.test_name as Test, collect(metric.id) as Metrics
```
*Table view showing which metrics each test measured.*

### 10. Show Page-Test Relationships
```cypher
MATCH (page:Page)<-[:TESTED_ON]-(test:ABTest)
RETURN page, test
```
*Visualizes which pages were involved in which tests.*

## Document and Content Queries

### 11. Show Documents and Their Connections
```cypher
MATCH (doc:Document)
OPTIONAL MATCH (doc)-[r]-(connected)
RETURN doc, r, connected
LIMIT 30
```
*Shows how Document nodes connect to other entities.*

### 12. Find Documents by Test Name
```cypher
MATCH (doc:Document)
WHERE doc.test_name CONTAINS 'conversion'
RETURN doc.test_name, doc.document_id, doc.page_count
```
*Search documents by keywords in test names.*

## Analysis Queries

### 13. Find All Winning Tests
```cypher
MATCH (test:ABTest)-[:PRODUCED]->(result:Result)
WHERE result.test_result CONTAINS 'Win' OR result.id CONTAINS 'Win'
RETURN test.test_name as Test, result.id as Result
```
*Lists all tests that had winning outcomes.*

### 14. Show Tests by Target Segment
```cypher
MATCH (test:ABTest)-[:TARGETS]->(segment:Segment)
RETURN segment.id as Segment, collect(test.test_name) as Tests
```
*Groups tests by the segments they targeted.*

### 15. Complete Test Journey (Advanced)
```cypher
MATCH path = (test:ABTest {test_name: 'Homepage: Special Offers Carousel — Merchandising Test'})-[*1..3]-(connected)
RETURN path
```
*Shows all connections up to 3 hops away from a specific test. Replace test name as needed.*

## Pattern Discovery Queries

### 16. Find Common Patterns
```cypher
MATCH (a)-[r]->(b)
RETURN labels(a)[0] as FromType, type(r) as Relationship, labels(b)[0] as ToType, count(*) as Count
ORDER BY Count DESC
```
*Discovers the most common relationship patterns in your graph.*

### 17. Find Nodes with Most Connections
```cypher
MATCH (n)
WITH n, size((n)--()) as degree
ORDER BY degree DESC
LIMIT 10
RETURN labels(n)[0] as NodeType, n.id as ID, n.test_name as Name, degree as Connections
```
*Identifies the most connected nodes - often the most important entities.*

## Tips for Using Neo4j Browser

### Navigation
- **Pan**: Click and drag on empty space
- **Zoom**: Scroll wheel or pinch
- **Select**: Click on nodes/relationships
- **Multi-select**: Ctrl/Cmd + click
- **Expand node**: Double-click to show hidden relationships
- **Fit to screen**: Use the target icon in bottom-right controls

### Customization
1. Click on any node label in the legend to customize:
   - Color
   - Size
   - Caption (what text appears on nodes)
2. Click on relationship types to customize their appearance

### Query Tips
- Use `LIMIT` to control result size
- Add `PROFILE` before any query to see execution plan
- Use `EXPLAIN` to see query plan without running it
- Press `Esc` to cancel a running query
- Use Ctrl/Cmd + Enter to run a query

### Useful Query Templates

**Find nodes by property**:
```cypher
MATCH (n:NodeType)
WHERE n.property = 'value'
RETURN n
```

**Find shortest path between nodes**:
```cypher
MATCH p = shortestPath((a:NodeType {id: 'id1'})-[*]-(b:NodeType {id: 'id2'}))
RETURN p
```

**Count relationships by type**:
```cypher
MATCH ()-[r]->()
RETURN type(r) as RelationType, count(*) as Count
ORDER BY Count DESC
```

## Common Property Keys in Your Database
Based on your screenshot, you can filter by these properties:
- `test_name`
- `test_launch`
- `test_end`
- `test_result`
- `test_hypothesis`
- `document_id`
- `page_count`
- `target_segment`
- `country`
- `id`
- `name`

## Next Steps
1. Start with query #2 to see a sample visualization
2. Run query #1 to understand your node distribution
3. Explore specific tests using queries #4-5
4. Trace insights and recommendations with query #7
5. Experiment with modifying these queries for your specific needs

Remember: Neo4j's visual interface makes it easy to explore - don't hesitate to click around and experiment!