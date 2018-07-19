/***************************************************************************************
 *                               XMLTree2.1
 *     此代码版权归海洋工作室ocean所有，您可以非商业目的使用、复制、修改此代码，但需要
 * 保留本工作室的版权信息。如果您使用、修改此代码为商业目的，请联系本工作室取得使用许可。
 * 此脚本的商业许可为RMB30，被许可方除不能分发和转售之外，可以用于被许可方的任何项目和
 * 产品当中。
 * 如果您对本程序有什么建议，请email to:ocean@forever.net.cn。
 *
 *                                                                          海洋工作室
 *                                                          http://www.oceanstudio.net
 *                                                     ocean(ocean@forever.net.cn) 制作
 *****************************************************************************************/ 

//XML树类
function XMLTree(treeName) {
	this.id = treeName;
	this.xmlDoc = null;
	this.dblClick = false;    // "true"为允许有双击事件，"false"为不允许有双击事件，默认为"false"
	this.openAction = false;  //展开节点时的行为,"true"为已展开的节点全部关闭，"false"为已展开的节点全部保持不变.

	this.isOpened = false;	//节点是否是展开的，false－没有展开
	this.isLoaded = false;	//节点是否是已经加载的。（针对ref型节点）
	this.isSelected = false;	//节点是否被选中

	this.ref = "";			//引用外部的xml路径
	this.autoRefresh = false;	//是否总是重新加载外部xml（false－不重新加载）

	this.text = "";	//节点的文字
	this.title = "";	//节点的提示

	this.textColor = "#000000";	//节点文字的颜色
	this.overTextColor = "#000000";	//节点鼠标放上去时候文字的颜色
	this.selectedTextColor = "#000000";	//节点被选中后的颜色

	this.backgroundColor = "";	//节点的背景色
	this.overBackgroundColor = "";	//节点鼠标放上去是的背景色
	this.selectedBackgroundColor = "#CCE0EF";	//节点被选中时候的背景色

	this.underLine = false;		//节点文字是否有下划线，false-没有下划线
	this.overUnderLine = true;	//节点鼠标放上去的时候文字是否有下划线，false-没有下划线
	this.selectedUnderLine = false;	//节点选中的时候文字是否有下划线

	this.fontSize = "12px";			//文字大小

	this.paddingLeft = "16px";//左边缩进
	this.paddingTop = "1px";  //上边缩进
	this.spaceWidth = "1px";    //图片和图片以及文字与图片之间间距
	this.leafPaddingLeft = "0px";	//2.01：叶子左边多余缩进

	this.cursor = "hand";		//鼠标的默认形状

	this.openFlag = "./images/pkg-open-0.gif";//节点打开时的第一个图片（一般是-号）
	this.closeFlag = "./images/pkg-closed-0.gif";//节点关闭时的第一个图片（一般是+号）
	this.openFolder = "./images/pkg-open-1.gif";//节点打开时的第二个图片（一般是一个文件夹的图片）
	this.closeFolder = "./images/pkg-closed-1.gif";//节点关闭时的第二个图片（一般是一个文件夹的图片）
	this.leafImage = "./images/leaf.gif";//叶子节点的图片
	//this.openFolder = "./images/img_2B-t.gif";//节点打开时的第二个图片（一般是一个文件夹的图片）
	//this.closeFolder = "./images/img_2A-t.gif";//节点关闭时的第二个图片（一般是一个文件夹的图片）
	//this.leafImage = "./images/img_child-t.gif";//叶子节点的图片
	this.href = "";//节点的url链接

	this.selectedNode = null;					//被选中的节点

	this.doc = null;		//节点的文档对象
	this.menuNode = new Array();		//节点数组：此节点的子菜单中的每一个节点
	this.parent = null;			//节点的父亲（为null的话表明这是一个树根）
	this.root = this;			//节点的根（为null的话表明这是一个树根）
	this.currentNode = null;	//当前正在使用的节点
}
//外部方法：异步xml读取数据，数据来自一个xml文件
XMLTree.prototype.load = function (url,container) {
	if (container != null)
		this.doc = container;
	this.xmlDoc = new ActiveXObject("Msxml.DOMDocument");
	this.root.currentNode = this;
	var f = new Function("event",this.root.id+".currentNode.parseTree()");
	this.xmlDoc.onreadystatechange = f;
	this.xmlDoc.load(url);
}
//展开一个节点的下一级子节点
XMLTree.prototype.open = function (nodeId) {
	var node = this.getMenuItem(nodeId);
	if (node == null) node = this;		//如果没有找到相应的节点，则以自身节点
	if (node.parent == null) return;		//如果节点是根结点，则返回
	var nodeType = node.getType();
	if (nodeType != "leaf") {		//叶子节点不去理会
		if (nodeType == "node")	{	//如果是一个包含字节点的节点
			node.doc.children[1].style.display = "block";
		}
		else {		//如果是引用节点
			if (node.isLoaded) {	//如果节点已经加载，则直接展开
				if (node.doc.children.length >= 2) {
					node.doc.children[1].style.display = "block";
				}
			}
			else {
				node.load(node.ref);		//加载子节点的树
				node.isLoaded = true;
			}
		}
		//标识节点为打开状态
		node.isOpened = true;
		node.doc.children[0].rows[0].cells[0].children[0].src = node.openFlag;
		node.doc.children[0].rows[0].cells[1].children[0].src = node.openFolder;
	}
}
//关闭一个节点的下一级子节点
XMLTree.prototype.close = function (nodeId) {
	var node = this.getMenuItem(nodeId);
	if (node == null) node = this;		//如果没有找到相应的节点，则以自身节点
	if (node.parent == null) return;		//如果节点是根结点，则返回
	var nodeType = node.getType();
	if (nodeType != "leaf") {		//叶子节点不去理会
		if (nodeType == "node")	{	//如果是一个包含字节点的节点
			if (node.doc.children.length >= 2) {
				node.doc.children[1].style.display = "none";
			}
		}
		else {		//如果是引用节点
			if (node.autoRefresh) {			//如果节点属于总是加载情况，则删除掉此节点的子节点
				node.doc.children[1].removeNode(true);
				node.menuNode = new Array();
				node.isLoaded = false;
			}
			else {
				if (node.doc.children.length >= 2) {
					node.doc.children[1].style.display = "none";
				}
			}
		}
		node.isOpened = false;
		node.doc.children[0].rows[0].cells[0].children[0].src = node.closeFlag;
		node.doc.children[0].rows[0].cells[1].children[0].src = node.closeFolder;
	}
}
//选中一个节点
XMLTree.prototype.selected = function (nodeId) {
	var node = this.getMenuItem(nodeId);
	if (node == null) node = this;		//如果没有找到相应的节点，则以自身节点
	if (node.parent == null) return;		//如果节点是根结点，则返回
	var oSpan = node.doc.children[0].cells[2].children[0];	//找到此节点相应的文字对象
	with (oSpan.style) {
		color = node.selectedTextColor;
		backgroundColor = node.selectedBackgroundColor;
		textDecoration = node.selectedUnderLine ? "underline" : "none";
	}
	node.isSelected = true;				//标识节点被选中
}
//取消选中的一个节点
XMLTree.prototype.unSelected = function (nodeId) {
	var node = this.getMenuItem(nodeId);
	if (node == null) node = this;		//如果没有找到相应的节点，则以自身节点
	if (node.parent == null) return;		//如果节点是根结点，则返回
	var oSpan = node.doc.children[0].cells[2].children[0];	//找到此节点相应的文字对象
	with (oSpan.style) {
		color = node.textColor;
		backgroundColor = node.backgroundColor;
		textDecoration = node.underLine ? "underline" : "none";
	}
	node.isSelected = false;				//标识节点被选中
}
//得到当前节点的类型，返回"leaf"、"node"、"ref"三种情况
XMLTree.prototype.getType = function () {
	if (this.ref != "") return "ref";
	if (this.menuNode.length > 0) return "node";
	return "leaf";
}
//根据菜单项id查找菜单项，返回拥有此id的菜单项
XMLTree.prototype.getMenuItem = function (id) {
	if (this.id == id) {		//如果此节点就是要寻找的节点
		return this;
	}
	else {
		for (var i=0;i<this.menuNode.length;i++) {
			var result = this.menuNode[i].getMenuItem(id);		//递归搜索子节点
			if (result != null)		//如果搜索到则返回此节点
				return result;
		}
		return null;		//如果搜索不到则返回null
	}
}
//2.01：根据菜单项href查找菜单项，返回拥有此href的菜单项
XMLTree.prototype.getMenuItemByHref = function (href) {
	if (this.href == href) {		//如果此节点就是要寻找的节点
		return this;
	}
	else {
		for (var i=0;i<this.menuNode.length;i++) {
			var result = this.menuNode[i].getMenuItemByHref(href);		//递归搜索子节点
			if (result != null)		//如果搜索到则返回此节点
				return result;
		}
		return null;		//如果搜索不到则返回null
	}
}
//解析xml树
XMLTree.prototype.parseTree = function () {
	var state = this.xmlDoc.readyState;
	if (state == 4)
	{
		var err = this.xmlDoc.parseError;
		if (err.errorCode != 0) {
			alert("菜单树加载失败");
			return false;
		}
		else {
			this.xmlDoc = this.xmlDoc.childNodes[1];
			this.initTree();
			this.attachTree();
			if (this.parent == null) {		//如果这是根的话，则附加事件
				var f = new Function("event",this.id+".doClick()");
				this.doc.attachEvent("onclick",f);
				f = new Function("event",this.id+".doDblClick()");
				this.doc.attachEvent("ondblclick",f);
				f = new Function("event",this.id+".doMouseOver()");
				this.doc.attachEvent("onmouseover",f);
				f = new Function("event",this.id+".doMouseOut()");
				this.doc.attachEvent("onmouseout",f);
			}
		}
	}
}
//初始化xml树
XMLTree.prototype.initTree = function () {
	if (this.xmlDoc == null) return;
	if (this.parent == null) {		//如果这是树根
		this.dblClick = (this.xmlDoc.getAttribute("dbl-click") == "true") ? true : false;
		this.openAction = (this.xmlDoc.getAttribute("open-action") == "true") ? true : false;
		//指定节点是否已经打开（此节点为根，这是取默认值）
		this.isOpened = false;
		//节点的样式和内容赋值（此节点为根，这是取默认值）
		this.autoRefresh = (this.xmlDoc.getAttribute("auto-refresh") == "true") ? true : false;
		this.textColor = (this.xmlDoc.getAttribute("text-color") == null) ? this.textColor : this.xmlDoc.getAttribute("text-color");
		this.overTextColor = (this.xmlDoc.getAttribute("over-text-color") == null) ? this.overTextColor : this.xmlDoc.getAttribute("over-text-color");
		this.selectedTextColor = (this.xmlDoc.getAttribute("selected-text-color") == null) ? this.selectedTextColor : this.xmlDoc.getAttribute("selected-text-color");
		this.backgroundColor = (this.xmlDoc.getAttribute("background-color") == null) ? this.backgroundColor : this.xmlDoc.getAttribute("background-color");
		this.overBackgroundColor = (this.xmlDoc.getAttribute("over-background-color") == null) ? this.overBackgroundColor : this.xmlDoc.getAttribute("over-background-color");
		this.selectedBackgroundColor = (this.xmlDoc.getAttribute("selected-background-color") == null) ? this.selectedBackgroundColor : this.xmlDoc.getAttribute("selected-background-color");
		this.underLine = (this.xmlDoc.getAttribute("under-line") == "true") ? true : false;
		this.overUnderLine = (this.xmlDoc.getAttribute("over-under-line") == "false") ? false : true;
		this.selectedUnderLine = (this.xmlDoc.getAttribute("selected-under-line") == "true") ? true : false;
		this.fontSize = (this.xmlDoc.getAttribute("font-size") == null) ? this.fontSize : this.xmlDoc.getAttribute("font-size");
		this.cursor = (this.xmlDoc.getAttribute("cursor") == null) ? this.cursor : this.xmlDoc.getAttribute("cursor");
		this.paddingLeft = (this.xmlDoc.getAttribute("padding-left") == null) ? this.paddingLeft : this.xmlDoc.getAttribute("padding-left");
		this.paddingTop = (this.xmlDoc.getAttribute("padding-top") == null) ? this.paddingTop : this.xmlDoc.getAttribute("padding-top");
		this.spaceWidth = (this.xmlDoc.getAttribute("space-width") == null) ? this.spaceWidth : this.xmlDoc.getAttribute("space-width");
		this.leafPaddingLeft = (this.xmlDoc.getAttribute("leaf-padding-left") == null) ? this.leafPaddingLeft : this.xmlDoc.getAttribute("leaf-padding-left");
		this.openFlag = (this.xmlDoc.getAttribute("open-flag") == null) ? this.openFlag : this.xmlDoc.getAttribute("open-flag");
		this.closeFlag = (this.xmlDoc.getAttribute("close-flag") == null) ? this.closeFlag : this.xmlDoc.getAttribute("close-flag");
		this.openFolder = (this.xmlDoc.getAttribute("open-folder") == null) ? this.openFolder : this.xmlDoc.getAttribute("open-folder");
		this.closeFolder = (this.xmlDoc.getAttribute("close-folder") == null) ? this.closeFolder : this.xmlDoc.getAttribute("close-folder");
		this.leafImage = (this.xmlDoc.getAttribute("leaf-image") == null) ? this.leafImage : this.xmlDoc.getAttribute("leaf-image");
	}
	//下面是循环调用，生成此节点节点的每一个子节点
	for (var i=0;i<this.xmlDoc.childNodes.length;i++)	{
		var child = this.xmlDoc.childNodes[i];
		var node = new XMLTree(child.getAttribute("id"));		//生成一个新节点
		node.parent = this;		//指定节点的父亲
		node.root = this.root;		//指定节点的根


		//指定节点是否已经打开
		node.isOpened = (child.getAttribute("opened") == "true") ? true : false;
		//节点的样式和内容赋值
		node.ref = (child.getAttribute("ref") == null) ? "" : child.getAttribute("ref");
		node.autoRefresh = (child.getAttribute("auto-refresh") == "true") ? true : false;
		node.text = (child.getAttribute("text") == null) ? "" : child.getAttribute("text");
		node.title = (child.getAttribute("title") == null) ? node.text : child.getAttribute("title");
		node.textColor = (child.getAttribute("text-color") == null) ? this.textColor : child.getAttribute("text-color");
		node.overTextColor = (child.getAttribute("over-text-color") == null) ? this.overTextColor : child.getAttribute("over-text-color");
		node.selectedTextColor = (child.getAttribute("selected-text-color") == null) ? this.selectedTextColor : child.getAttribute("selected-text-color");
		node.backgroundColor = (child.getAttribute("background-color") == null) ? this.backgroundColor : child.getAttribute("background-color");
		node.overBackgroundColor = (child.getAttribute("over-background-color") == null) ? this.overBackgroundColor : child.getAttribute("over-background-color");
		node.selectedBackgroundColor = (child.getAttribute("selected-background-color") == null) ? this.selectedBackgroundColor : child.getAttribute("selected-background-color");
		node.underLine = (child.getAttribute("under-line") == "true") ? true : false;
		node.overUnderLine = (child.getAttribute("over-under-line") == "false") ? false : true;
		node.selectedUnderLine = (child.getAttribute("selected-under-line") == "true") ? true : false;
		node.fontSize = (child.getAttribute("font-size") == null) ? this.fontSize : child.getAttribute("font-size");
		node.cursor = (child.getAttribute("cursor") == null) ? this.cursor : child.getAttribute("cursor");
		node.paddingLeft = (child.getAttribute("padding-left") == null) ? this.paddingLeft : child.getAttribute("padding-left");
		node.paddingTop = (child.getAttribute("padding-top") == null) ? this.paddingTop : child.getAttribute("padding-top");
		node.spaceWidth = (child.getAttribute("space-width") == null) ? this.spaceWidth : child.getAttribute("space-width");
		node.leafPaddingLeft = (child.getAttribute("leaf-padding-left") == null) ? this.leafPaddingLeft : child.getAttribute("leaf-padding-left");
		node.openFlag = (child.getAttribute("open-flag") == null) ? this.openFlag : child.getAttribute("open-flag");
		node.closeFlag = (child.getAttribute("close-flag") == null) ? this.closeFlag : child.getAttribute("close-flag");
		node.openFolder = (child.getAttribute("open-folder") == null) ? this.openFolder : child.getAttribute("open-folder");
		node.closeFolder = (child.getAttribute("close-folder") == null) ? this.closeFolder : child.getAttribute("close-folder");
		node.leafImage = (child.getAttribute("leaf-image") == null) ? this.leafImage : child.getAttribute("leaf-image");
		node.href = (child.getAttribute("href") == null) ? "" : child.getAttribute("href");

		this.menuNode[this.menuNode.length] = node;		//加入一个新节点
		node.xmlDoc = child;
		node.initTree();		//递归调用，加载此节点的子节点
	}
}
//附加文档对象
XMLTree.prototype.attachTree = function () {
	if (this.menuNode.length == 0) return;	//如果是没有加载的引用节点或者是叶子节点，则返回
	var container = null;
	if (this.parent == null) {
		container = this.doc;
	}
	else {
		container = document.createElement("DIV");
		container.style.paddingLeft = this.paddingLeft;		//设置缩进
		container.style.paddingTop = this.paddingTop;		//设置上边距
		container.style.width = "100%";
		if (this.getType() == "ref") {		//如果是引用节点，则标识打开和已经加载
			this.isOpened = true;
			this.isLoaded = true;
		}
		if (this.isOpened) {
			container.style.display = "block";
		}
		else {
			container.style.display = "none";
		}

	}
	this.doc.appendChild(container);

	for (var i=0;i<this.menuNode.length;i++) {
		var node = this.menuNode[i];
		var oDiv = document.createElement("DIV");
		oDiv.id = this.root.id+node.id;
		oDiv.style.width = "100%";
		var html = "";
		html += '<table style="width:100%" title="'+node.title+'"><tr><td style="width:1px;vertical-align:middle;">';
		html += (node.getType() == "leaf") ? "" : ('<img src="'+(node.isOpened ? node.openFlag : node.closeFlag)+'">');
		html += '</td><td style="width:1px;padding-left:'+((node.getType() == "leaf") ? node.leafPaddingLeft : node.spaceWidth)+';vertical-align:middle;"><img src="';
		html += (node.getType() == "leaf") ? node.leafImage : (node.isOpened ? node.openFolder : node.closeFolder);
		html += '"></td><td style="vertical-align:middle;'+((node.getType() == "leaf") ? "padding-top:"+node.paddingTop+";" : "")+'padding-left:' +node.spaceWidth+';"><span style="cursor:'+node.cursor+';font-size:'+node.fontSize+';color:'+node.textColor+';background-color:'+node.backgroundColor+';text-decoration:'+(node.underLine ? "underline" : "none")+ ';">'+node.text+'</span></td></tr></table>';
		oDiv.innerHTML = html;
		container.appendChild(oDiv);
		node.doc = oDiv;			//设置文档对象
		node.attachTree();			//递归加载树
	}
}
//根据传入的对象找到相应的节点
XMLTree.prototype.getNode = function (oE) {
	while (oE.tagName != "DIV" && oE.tagName != "BODY")	{
		oE = oE.parentElement;
	}
	if (oE.tagName == "BODY") return;
	return this.root.getMenuItem(oE.id.substr(this.root.id.length));
}
//处理onmouseover事件
XMLTree.prototype.doMouseOver = function () {
	var oE = window.event.srcElement;
	if (oE.tagName != "SPAN") return;	//如果不是移出到文字上，直接返回
	var node = this.getNode(oE);		//得到此节点的对象
	if (node == null)	return;			//如果此节点对象为null，则返回
	if (node.isSelected) return;		//如果此节点对象已经被选中，则返回
	with (oE.style) {
		color = node.overTextColor;
		backgroundColor = node.overBackgroundColor;
		textDecoration = node.overUnderLine ? "underline" : "none";
	}
}
//处理onmouseout事件
XMLTree.prototype.doMouseOut = function () {
	var oE = window.event.srcElement;
	if (oE.tagName != "SPAN") return;	//如果不是移动到文字上，直接返回
	var node = this.getNode(oE);		//得到此节点的对象
	if (node == null)	return;			//如果此节点对象为null，则返回
	if (node.isSelected) return;		//如果此节点对象已经被选中，则返回
	with (oE.style) {
		color = node.textColor;
		backgroundColor = node.backgroundColor;
		textDecoration = node.underLine ? "underline" : "none";
	}
}
//处理onclick事件
XMLTree.prototype.doClick = function () {
	var oE = window.event.srcElement;
	if (oE.tagName != "SPAN" && oE.tagName != "IMG") return;	//如果不是单击到文字或者图片上，直接返回
	var node = this.getNode(oE);		//得到此节点的对象
	if (node == null)	return;			//如果此节点对象为null，则返回
	var doOpen = false;			//标识是否有展开动作
	//如果是点击在文字上
	if (oE.tagName == "SPAN") {
		if (node.root.selectedNode != node)	{
			if (node.root.selectedNode != null) node.root.selectedNode.unSelected();	//取消选中上一个被选中的节点
			if (!node.isSelected) {		//如果当前节点没有被选中
				node.selected();	//选中当前的节点
				node.root.selectedNode = node;	//记住当前被选中的节点
			}
		}

		if (node.href != "") {
			window.location.href = node.href;		//定向文字上的链接
		}

		if (!node.root.dblClick) {	//如果不是双击节点才打开/关闭节点，也就是单击就打开/关闭节点
			if (node.isOpened) {
				node.close();
			}
			else {
				node.open();
				doOpen = true;
			}
		}
	}
	else {		//如果是点击到图片上，则直接打开/关闭节点
		if (node.isOpened) {
			node.close();
		}
		else {
			node.open();
			doOpen = true;
		}
	}
	if (doOpen)	{	//如果有展开动作，需要判断展开动作的行为
		if (node.root.openAction)	{		//说明需要关闭其它节点
			node.closeAllNode();
		}
	}
}
//处理ondblclick事件
XMLTree.prototype.doDblClick = function () {
	if (!this.root.dblClick) return;	//如果不是必须通过双击才展开/关闭节点，则直接返回
	var oE = window.event.srcElement;
	if (oE.tagName != "SPAN") return;	//如果不是双击到文字上，直接返回
	var node = this.getNode(oE);		//得到此节点的对象
	if (node == null)	return;			//如果此节点对象为null，则返回

	if (node.root.selectedNode != null) node.root.selectedNode.unSelected();	//取消选中上一个被选中的节点
	node.selected();	//选中当前的节点
	node.root.selectedNode = node;	//记住当前被选中的节点

	if (node.href != "") {
		window.location.href = node.href;		//定向文字上的链接
	}

	if (node.isOpened) {
		node.close();
	}
	else {
		node.open();
		if (node.root.openAction) {		//说明需要关闭其它节点
			node.closeAllNode();
		}
	}
}
//关闭除自身节点之外的所有节点
XMLTree.prototype.closeAllNode = function () {
	if (this.parent == null) return;		//已经到了根
	var parentNode = this.parent;
	for (var i=0;i<parentNode.menuNode.length;i++) {	//循环关闭每一个子节点
		var childnode = parentNode.menuNode[i];
		if (childnode.isOpened)	{		//如果子节点已经打开
			if (childnode != this) {	//如果子节点不是当前节点
				childnode.close();
			}
		}
	}
	parentNode.closeAllNode();		//继续关闭父节点之外的所有节点（递归调用）
}
//2.0：将自身节点或者指定的id的节点的父节点展开(2.1修正bug)
XMLTree.prototype.openParent = function (nodeId) {
	var node = this.getMenuItem(nodeId);
	if (node == null) node = this;
	if (node.parent == null) {
		return;
	}
	node.parent.openParent();
	node.open();
	if (node.root.selectedNode != node)	{
		if (node.root.selectedNode != null) node.root.selectedNode.unSelected();	//取消选中上一个被选中的节点
		if (!node.isSelected) {		//如果当前节点没有被选中
			node.selected();	//选中当前的节点
			node.root.selectedNode = node;	//记住当前被选中的节点
		}
	}
}
//2.01：将自身节点或者指定href节点的父节点展开
XMLTree.prototype.openParentByHref = function (href) {
	var node = this.getMenuItemByHref(href);
	if (node == null) return;
	node.openParent();
}