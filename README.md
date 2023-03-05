![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")
# Sitecore Hackathon 2023

- MUST READ: **[Submission requirements](SUBMISSION_REQUIREMENTS.md)**
- [Entry form template](ENTRYFORM.md)
  
# Hackathon Submission Entry form


You can find a very good reference to Github flavoured markdown reference in [this cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). If you want something a bit more WYSIWYG for editing then could use [StackEdit](https://stackedit.io/app) which provides a more user friendly interface for generating the Markdown code. Those of you who are [VS Code fans](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview) can edit/preview directly in that interface too.

## Team name
⟹ OnlyBugs

## Category
⟹ Best enhancement to SXA Headless

## Description
⟹ Our module is called AI Image. The purpose is obtain images from Open AI image generator to be included on a Image rendering type control.

The module is the entry point to extend the toolbox and add more AI options such as ChatGPT to text generation.

The most keywords or details used on the request, the better results you can expect at the moment of image generation. 

As future work the module can be extended to support CDN services and store the generated image on their servers.
  

## Video link
⟹ Provide a video highlighing your Hackathon module submission and provide a link to the video. You can use any video hosting, file share or even upload the video to this repository. _Just remember to update the link below_

⟹ [Replace this Video link](#video-link)



## Pre-requisites and Dependencies

⟹ Does your module rely on other Sitecore modules or frameworks?

- NodeJS
- npm 
- Windows Powershell



## Installation instructions
⟹ Write a short clear step-wise instruction on how to install your module.  

> _A simple well-described installation process is required to win the Hackathon._  
> Feel free to use any of the following tools/formats as part of the installation:
> - Sitecore Package files
> - Docker image builds
> - Sitecore CLI
> - msbuild
> - npm / yarn
> 
> _Do not use_
> - TDS
> - Unicorn
 
for example:

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
12. Install the following sitecore package



### Configuration

- Add the following line on .env file
  > process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

- If you are having issues with CORS reference hange the file \App_Config\Sitecore\Services.Client\Sitecore.Services.Client.config
  >     <allowedOrigins hint="list:AddOrigin">
	>					<origin>https://onlybugs.localcm.dev.local</origin>
	>					<origin>http://localhost:3000</origin>
  >     </allowedOrigins>



## Usage instructions

- Make sure the localhost site is up and running using :
  >jss start:connected
- Open Sitecore and navigate to the OnlyBugs tenant, select the home item and open Experience Editor

![Tenant tree](docs/images/sctree.png?raw=true "tenant tree")

![SXA Content editor](docs/images/ced.png?raw=true "SXA Content editor")



![AIImage control](docs/images/AIImage.png?raw=true "AIImage control")

![Asociate content](docs/images/asocont.png?raw=true "Asociate content")




![txt blue apple](docs/images/txtblueapple.png?raw=true "txt blue apple")


![blue apple content editor](docs/images/blueapplerequest.png?raw=true "blue apple content editor")

![blue apple localhost](docs/images/blueapple.png?raw=true "blue apple localhost")

- Also


![localhost](docs/images/localhost.png?raw=true "localhost")

⟹ Provide documentation about your module, how do the users use your module, where are things located, what do the icons mean, are there any secret shortcuts etc.



## Comments
- We recommed test it on incognito window/tab to see the change of the images each time you reload.
- Also the module can take some time to show images due this is a async method and the time varies by the amount of the request / keywords.
- If needed please clear your browser cache 


