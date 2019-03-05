## 前言
我们知道，在chrome（等一些现代浏览器）中，你可以将访问的网站添加到桌面，这样就会在桌面生成一个类似“快捷方式”的图标，当你点击该图标时，便可以快速访问该网站(web app)

## 特性
- Web App可以被添加到桌面并有它自己的应用图标
- 同时，从桌面开启时，会和原生app一样有它自己的“开屏图”
- 更进一步的，这个Web App在的样子几乎和原生应用一样——没有浏览器的地址栏、工具条，似乎和Native App一样运行在一个独立的容器中

## Web App Manifest
Manifest是一个JSON格式的文件，你可以把它理解为一个指定了Web App桌面图标、名称、开屏图标、运行模式等一系列资源的一个清单。

## Json

### name, short_name

指定了Web App的名称。
`short_name` 其实是该应用的一个简称。一般来说，当没有足够空间展示应用的 `name` 时，系统就会使用 `short_name`

### start_url
这个属性指定了用户打开该Web App时加载的URL。相对URL会相对于manifest。这里我们指定了 `start_url` 为 `/`，访问根目录。

### display
`display` 控制了应用的显示模式，它有四个值可以选择： `fullscreen` 、 `standalone` 、 `minimal-ui` 和 `browser`。

- `fullscreen` ：全屏显示，会尽可能将所有的显示区域都占满；

- `standalone` ：独立应用模式，这种模式下打开的应用有自己的启动图标，并且不会有浏览器的地址栏。因此看起来更像一个Native App；

- `minimal-ui` ：与`standalone`相比，该模式会多出地址栏；

- `browser` ：一般来说，会和正常使用浏览器打开样式一致。

### orientation

控制Web App的方向。设置某些值会具有类似锁屏的效果（禁止旋转），例如例子中的 `portrait-primary` `。具体的值包括：any`, `natural`, `landscape`, `landscape-primary`, `landscape-secondary`,` portrait`, `portrait-primary`, `portrait-secondary`。

### `icons` ， `background_color`

`icons` 用来指定应用的桌面图标。`icons` 本身是一个数组，每个元素包含三个属性：

- `sizes` ：图标的大小。通过指定大小，系统会选取最合适的图标展示在相应位置上。
- `src` ：图标的文件路径。注意相对路径是相对于manifest。
- `type` ：图标的图片类型。

需要指出的是，我一直提的“开屏图”其实是背景颜色+图标的展示模式（并不会设置一张所谓的开屏图）。`background_color`是在应用的样式资源为加载完毕前的默认背景，因此会展示在开屏界面。`background_color`加上我们刚才定义的`icons` 就组成了Web App打开时的“开屏图”。

### theme_color
定义应用程序的默认主题颜色。 这有时会影响操作系统显示应用程序的方式（例如，在Android的任务切换器上，主题颜色包围应用程序）。此外，还可以在meta标签中设置theme_color：`<meta name="theme-color" content="#5eace0"/>`

### description
这个字段的含义非常简单，就是一段对该应用的描述。

### 兼容性
[https://caniuse.com/#search=manifest](caniuse)

## iOS（safari）中的处理方式

- safari虽然不支持Web App Manifest，但是它有自己的一些head标签来定义相应的资源与展示形式：


- apple-touch-icon：桌面图标，通过在head中添加<link rel="apple-touch-icon" href="your_icon.png">即可。其中还可以添加sizes属性，来指示系统使用在各类平台（iphone、ipad…）中使用最合适的图标

- apple-mobile-web-app-title：应用的标题。注意，这里需要使用meta标签<meta name="apple-mobile-web-app-title" content="AppTitle">


- apple-mobile-web-app-capable：类似于manifest中的display的功能，通过设置为yes可以进入standalone模式，同样也是meta标签<meta name="apple-mobile-web-app-capable" content="yes">


- apple-mobile-web-app-status-bar-style：这会改变iOS移动设备的状态栏的样式，并且只有在standalone模式中才会有效果。<meta name="apple-mobile-web-app-status-bar-style" content="black">，不过在iPhoneX上black会导致状态栏不显示任何东西。
