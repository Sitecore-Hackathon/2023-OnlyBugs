![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")
# Sitecore Hackathon 2023

- MUST READ: **[Submission requirements](SUBMISSION_REQUIREMENTS.md)**
- [Entry form template](ENTRYFORM.md)
  
# Hackathon Submission Entry form

## Team name
⟹ OnlyBugs
Iñaki Manosalvas
Erick Peñafiel
Cesar Yanez

## Category
⟹ Best enhancement to SXA Headless

## Description
Our module is called AI Image - DallAI. The purpose is obtain images from Open AI image generator to be included on a Image rendering type control.

The module is the entry point to extend the toolbox and add more AI options such as ChatGPT to text generation.

The most keywords or details used on the request, the better results you can expect at the moment of image generation. 

As future work the module can be extended to support CDN services and store the generated image on their servers.
  

## Video link

⟹ [Replace this Video link](#video-link)



## Pre-requisites and Dependencies

- NodeJS
- npm 
- Windows Powershell



## Installation instructions

1. Install Sitecore 10.3 using Graphical setup for XM scaled. Make sure to install "Sitecore Experience Acelerator (SXA)" on optional modules.
2. Use Sitecore Installation wizard to install the following packages
    - Experience Edge Connector for Sitecore XM
    - Sitecore Headless Services for Sitecore XM
    [Link to the packages](https://dev.sitecore.net/Downloads/Sitecore_Experience_Platform/103/Sitecore_Experience_Platform_103.aspx)
3. Go to /sitecore/system/Settings/Services/Rendering Hosts/Default and open the file.
    - In the “Server side rendering engine endpoint URL” field, put: http://localhost:3000/api/editing/render

    - In the “Server side rendering engine application URL” field, put: http://localhost:3000
4. Create a API key item on sitecore and add "*" on CORS Origins and Allowed Controllers.
5. Open a powershell window as administrator and run:
    > npx create-sitecore-jss --templates nextjs,nextjs-sxa --appName Onlybugs --hostName onlybugs.localcm.dev.local --fetchWith GraphQL
  
    Select the option SSG
6. After finishing setting up the Next.js project, navigate to the recently created folder and run the following commands: 
    >npm install -g @sitecore-jss/sitecore-jss-cli
    
    >Set ExecutionPolicy Unrestricted

    >$env:NODE_TLS_REJECT_UNAUTHORIZED=0
7. Edit the Onlybugs.config to add a random string on "JavaScriptServices.ViewEngine.Http.JssEditingSecret"
8. on the env.config file add the values on the corresponfing properties
    >http://localhost:3000

    >-JSS_EDITING_SECRET- value

    >-SITECORE_API_KEY- value

    >https://onlybugs.localcm.dev.local/
9. Run the following commands
    >jss setup

    >jss deploy config
10. Install OpenAI
    >npm install openai

    >npm install dalle-node

11. run the following command to see the site on http://localhost:3000
    > jss start:connected
12. Install the sitecore package located at ..\2023-OnlyBugs\docs



### Configuration

- Add the following line on .env file
  > process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

- If you are having issues with CORS reference hange the file \App_Config\Sitecore\Services.Client\Sitecore.Services.Client.config
  >     <allowedOrigins hint="list:AddOrigin">
	>					<origin>https://onlybugs.localcm.dev.local</origin>
	>					<origin>http://localhost:3000</origin>
  >     </allowedOrigins>

- Update the variable apikey wiht a new generated key if you are seeing 401 forbidden error.



## Usage instructions

- Make sure the localhost site is up and running using :
  >jss start:connected
- Open Sitecore and navigate to the OnlyBugs tenant, select the home item and open Experience Editor

![Tenant tree](docs/images/sctree.png?raw=true "tenant tree")

![SXA Content editor](docs/images/ced.png?raw=true "SXA Content editor")

- Drag and drop the DallAI control to the page, after that you can select the item associated with the module

![Asociate content](docs/images/asocont.png?raw=true "Asociate content")

- You can edit the fiel Search and add your search terms / keywords
![blue apple content editor](docs/images/blueapplerequest.png?raw=true "blue apple content editor")

- After some time you will see the generated image

![blue apple localhost](docs/images/blueapple.png?raw=true "blue apple localhost")


- You can add as many controls you want and have separated search terms as you can see on the following image

![localhost](docs/images/localhost.png?raw=true "localhost")



## Comments
- We recommed test it on incognito window/tab to see the change of the images each time you reload.
- Also the module can take some time to show images due this is a async method and the time varies by the amount of the request / keywords.
- If needed please clear your browser cache 
- We are using OpenAI free tier so the keys can expire really quick you can generate a new key and replace it on the file DallAI.tsx


Thank You!!!
