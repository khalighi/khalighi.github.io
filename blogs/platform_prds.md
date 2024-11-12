# Product Management for Platform Products: Crafting a Two-Layer PRD

**Date: October 20, 2024**

## The Role of the PRD
In product management, a Product Requirements Document (PRD) serves as the blueprint for building a product. It defines the objectives, functionality, user experience, and technical requirements needed to bring a concept to life. A typical PRD includes sections such as:

1. **Objective**: The overarching purpose or goal of the product.
2. **User Personas**: Identified users, their needs, and how the product will meet those needs.
3. **Features**: Specific product features that address user needs.
4. **User Stories**: Detailed descriptions of functionality from a user's perspective.
5. **Functional Requirements**: Technical details and specifications to ensure the product operates as expected.
6. **Non-Functional Requirements**: Considerations like scalability, security, and performance.

This structure is essential for defining what a product does and how it serves its users. But for platform products, this standard PRD needs adaptation to capture the unique dynamics of platforms.

## Distilling Requirements for Platform Products
Unlike single-purpose applications, platform products serve as foundations for multiple applications. Platforms are built to support diverse use cases, with applications layered on top of them. End-users generally engage with the applications rather than directly with the platform, which creates a complex chain of requirements.

For example, if you’re building a platform to support hundreds of applications, each catering to different types of users, listing all requirements directly from end-user perspectives could result in overwhelming and fragmented requirements. Instead, platform PRDs benefit from a more distilled approach that focuses on two levels:

1. **Application Layer Requirements**: End-user stories that define the functional needs for applications operating on the platform.
2. **Platform Layer Requirements**: Requirements that define what the platform must provide to enable these applications, thus indirectly fulfilling end-user needs.

In this structure, the PRD becomes a two-layered document that considers both applications and the platform itself as key "personas."

## Example: A Platform for Building Dashboards

Imagine a platform designed to support applications that create business dashboards. Here, the **end-user** is a business analyst who needs to view trends and insights. The **application** layer includes a dashboarding tool that queries data and visualizes results. The **platform** layer supports these applications by storing data and running queries efficiently.

### Application Layer User Stories
1. **As a Business Analyst**, I want the dashboard application to display sales trends so that I can make data-driven decisions.
2. **As a Business Analyst**, I want to filter and customize data views on the dashboard so that I can focus on specific insights relevant to my team.

### Platform Layer User Stories
1. **As the Dashboard Application**, I want the platform to store large datasets so that I can pull data as needed for visualization.
2. **As the Dashboard Application**, I want the platform to process complex queries efficiently so that data retrieval for visualization is fast.
3. **As the Dashboard Application**, I want the platform to provide APIs for data access so that I can easily integrate data into dashboard visualizations.

### Example Two-Layer PRD

#### Application Layer Requirements (Dashboard Application)
- **Objective**: Enable end-users to visualize data trends.
- **User Stories**:
  - **As a Business Analyst**, I want to see monthly sales trends, broken down by region, to evaluate market performance.
  - **As a Business Analyst**, I want the ability to export dashboards to share with my team for review.
  - **As a Business Analyst**, I want the dashboard to support dynamic filtering to focus on specific metrics.

#### Platform Layer Requirements (Supporting the Dashboard Application)
- **Objective**: Provide a robust, scalable foundation for data storage, querying, and API access to support dashboard applications.
- **User Stories**:
  - **As the Dashboard Application**, I want access to historical sales data through efficient data storage capabilities so I can generate historical trends.
  - **As the Dashboard Application**, I want the platform to support filtering logic so that users can refine their data view dynamically.
  - **As the Dashboard Application**, I want fast query processing so that users experience minimal delay in data loading.

## Conclusion
For platform products, a two-layer PRD can more effectively capture requirements by treating applications as the "user" of the platform. This approach brings clarity and structure to platform design, enabling product managers to build a cohesive ecosystem that supports multiple applications, each serving diverse end-user needs. This method ultimately allows platforms to scale without being bogged down by a fragmented list of direct end-user requirements, streamlining platform development and ensuring alignment between the platform’s capabilities and the applications it supports.