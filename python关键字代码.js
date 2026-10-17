//名称：Python关键字代码（3.16版）
//最近更新：2026.10.16
//作者：nine

// 1. 封装扩展代码：避免全局变量污染，Scratch扩展标准外层结构
// 传入Scratch全局对象，确保能访问扩展注册API
(function(Scratch) {
    "use strict"; // 启用严格模式，减少语法错误（如未声明变量）

    /**
         * 2. 扩展核心类：所有积木逻辑、配置都封装在此类中
         * aaa类名可自定义（建议语义化，如MyMathExtension、GameTools）
         */
    let showAdvanced = false;

    class PythonCode{
        /**
         * 3. 核心方法：定义扩展元信息和积木结构
         * Scratch会通过此方法识别扩展的名称、颜色、积木列表等
         * 必须返回一个包含固定字段的对象
         * @returns {Object} 扩展配置对象
         */
        getInfo() {
            return {
                // abcabc扩展唯一ID：必填，小写、无空格、全局唯一（避免与其他扩展冲突）
                // 示例："mymathextension"、"gametools"
                id: "pythoncode",

                // None0扩展显示名称：必填，显示在Scratch积木面板的扩展列表中
                name: "Python关键字代码",

                // 积木主色调：必填，十六进制颜色，用于区分不同扩展的积木样式
                color1: "#3776AB",
                // 积木渐变色（可选）：增强视觉效果
                color2: "#646464",
                // 积木边框色（可选）：细化积木样式
                color3: "#FFD43B",

                // 自定义下拉菜单（可选）：若不需要可删除此字段
                // 格式：{ 菜单ID: { items: [{value: 实际值, text: 显示文本}] } }
                menus: {},

                // 积木列表：必填（至少空数组），每个元素对应一个积木
                // 若暂时无积木，保留空数组，后续添加
                blocks: [
            {
                opcode: "noneRep", // opcode积木唯一标识（需与方法名一致，例：printText）
                blockType: Scratch.BlockType.REPORTER, // None修改为积木类型：COMMAND命令(无返回值)REPORTER圆形(数值)BOOLEAN(布尔值)HAT(启动)
                text: "None", // None2积木显示文本，[]是参数占位符,例如：打印[TEXT]
                disableMonitor: true, //true为积木不带监视器，false为积木带监视器
            },
            {
                opcode:"trueBool",
                blockType:Scratch.BlockType.BOOLEAN,
                text: "True",
                disableMonitor: true
            },
            {
                opcode:"falseBool",
                blockType:Scratch.BlockType.BOOLEAN,
                text: "False",
                disableMonitor: true
            },
            {
                opcode: "forC",
                blockType: Scratch.BlockType.CONDITIONAL,
                branchCount: 1, 
                text: "for [VAR_NAME] in range([START], [END]):",
                arguments: {
                    VAR_NAME: {
                        // 👇 核心：必须是 STRING，不能用 VARIABLE！
                        type: Scratch.ArgumentType.STRING, 
                        defaultValue: "a var" 
                    },
                    START: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 1
                    },
                    END: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 10
                    }
                }
            },
            {
                opcode: "whileC",
                blockType: Scratch.BlockType.CONDITIONAL,
                branchCount: 1,
                text: "while [cond]:",
                arguments: {
                    cond: {
                        type: Scratch.ArgumentType.BOOLEAN, // 必须是布尔值
                        defaultValue: false // 默认给 false，防止一拖出来就死循环
                    }
                }
            },
            {
                opcode:"passCo",
                blockType:Scratch.BlockType.COMMAND,
                text:"pass",
            },

            "---",
            //已有积木区
            // 切换按钮
            {
                blockType: Scratch.BlockType.LABEL,
                text: "Scratch里已有的Python积木",
                hideFromPalette: !showAdvanced 
            },
            {
                func: "enableAdvanced", // 绑定下面的函数名
                blockType: Scratch.BlockType.BUTTON,
                text: "开启Scratch里已有的Python积木",
                hideFromPalette: showAdvanced // 状态为 true 时隐藏自己
            },
            {
                opcode:"andBool",
                blockType:Scratch.BlockType.BOOLEAN,
                text: "[and1]and[and2]",
                hideFromPalette: !showAdvanced,
                disableMonitor: true,
                arguments: { // 参数定义
                    and1: {
                        type: Scratch.ArgumentType.BOOLEAN, // None3参数类型：STRING文本NUMBER数字BOOLEAN布尔值COLOR颜色窗口NOTE音符窗口ANGLE方向窗口MATRIX矩阵窗口
                        defaultValue: false
                    },
                    and2: {
                        type: Scratch.ArgumentType.BOOLEAN,
                        defaultValue: false
                    },
                }
            },
            {
                opcode:"orBool",
                blockType:Scratch.BlockType.BOOLEAN,
                text: "[or1]or[or2]",
                hideFromPalette: !showAdvanced,
                disableMonitor: true,
                arguments: { // 参数定义
                    or1: {
                        type: Scratch.ArgumentType.BOOLEAN, // None3参数类型：STRING文本NUMBER数字BOOLEAN布尔值COLOR颜色窗口NOTE音符窗口ANGLE方向窗口MATRIX矩阵窗口
                        defaultValue: false
                    },
                    or2: {
                        type: Scratch.ArgumentType.BOOLEAN,
                        defaultValue: false
                    },
                }
            },
            {
                opcode:"notBool",
                blockType:Scratch.BlockType.BOOLEAN,
                text: "not[not1]",
                hideFromPalette: !showAdvanced,
                disableMonitor: true,
                arguments: { // 参数定义
                    not1: {
                        type: Scratch.ArgumentType.BOOLEAN, // None3参数类型：STRING文本NUMBER数字BOOLEAN布尔值COLOR颜色窗口NOTE音符窗口ANGLE方向窗口MATRIX矩阵窗口
                        defaultValue: false
                    }
                }
            },
            {
                opcode: "inBool",
                blockType: Scratch.BlockType.BOOLEAN, // 六边形布尔积木
                text: "[str1] in [str2]",
                hideFromPalette: !showAdvanced, // 如果是高级积木，保留这行
                disableMonitor: true,
                arguments: {
                    str1: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: "value"
                    },
                    str2: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: "string_list"
                    }
                }
            },
            {
                opcode: "ifC",
                blockType: Scratch.BlockType.CONDITIONAL,
                branchCount: 1, // 只有1个C型凹槽
                text: "if [cond]:",
                hideFromPalette: !showAdvanced,
                arguments: {
                    cond: {
                        type: Scratch.ArgumentType.BOOLEAN,
                        defaultValue: false
                    },
                },
            },
            {
                opcode:"ifelseC",
                blockType:Scratch.BlockType.CONDITIONAL,
                branchCount: 2, // 有2个C型凹槽
                text:"if[cond] else:",
                hideFromPalette: !showAdvanced,
                arguments: {
                    cond: {
                        type: Scratch.ArgumentType.BOOLEAN,
                        defaultValue: false
                    }
                }
            },
            {
                opcode:"elifC",
                blockType:Scratch.BlockType.CONDITIONAL,
                branchCount: 3,
                text:"if: [cond1] elif: [cond2] else:",
                hideFromPalette: !showAdvanced,
                arguments: {
                    cond1: {
                        type: Scratch.ArgumentType.BOOLEAN,
                        defaultValue: false
                    },
                    cond2: {
                        type: Scratch.ArgumentType.BOOLEAN,
                        defaultValue: false
                    }
                }
            }
        ]
    };
}
    noneRep(){//opcode的名称
        return "";//输出，例：Number(args.A) + Number(args.B);（A+B的值）
    }

    trueBool(){
        return true;
    }

    falseBool(){
        return false;
    }

    // 积木定义保持不变，只替换 PythonCode 类里面的执行函数
    forC(args, util) {
        // 1. 拿到用户输入的变量名
        let varName = String(args.VAR_NAME || "").trim();
        if (!varName) varName = "i"; // 如果用户把输入框清空了，默认用 i

        // 2. 自动查找变量，找不到就自动创建
        const variable = util.target.lookupOrCreateVariable(varName, varName);
        
        let start = Number(args.START) || 0;
        let end = Number(args.END) || 0;

        // 3. 初始化
        if (typeof util.stackFrame.index === 'undefined') {
            util.stackFrame.index = start;
        }
        
        // 4. 执行
        if (util.stackFrame.index <= end) {
            variable.value = util.stackFrame.index;
            util.stackFrame.index++;
            util.startBranch(1, true); 
        } else {
            delete util.stackFrame.index;
        }
    }

    whileC(args, util) {
        // 🛡️ 防死循环机制：初始化安全计数器
        if (typeof util.stackFrame.safetyCounter === 'undefined') {
            util.stackFrame.safetyCounter = 0;
        }

        // 1. 获取条件
        const condition = Boolean(args.cond);

        // 2. 如果条件为真，且没超过最大循环次数，就执行
        if (condition) {
            util.stackFrame.safetyCounter++; // 计数器 +1
            util.startBranch(1, true); // 核心：启动循环分支，true 表示循环
        } else {
            // 3. 条件为假，或者循环次数太多，结束循环，清理现场
            delete util.stackFrame.safetyCounter;
        }
    }

    passCo() {
        //no-op
    }
    // 按钮点击事件
    enableAdvanced() {
        if (confirm("这会开启Scratch里已有的Python积木，是否继续？")) {
            showAdvanced = true;
            // 核心：重新绘制工具箱
            Scratch.vm.extensionManager.refreshBlocks();
        }
    }

    andBool(args){
        return Scratch.Cast.toBoolean(args.and1) && Scratch.Cast.toBoolean(args.and2);
    }

    orBool(args){
        return Scratch.Cast.toBoolean(args.or1) || Scratch.Cast.toBoolean(args.or2);
    }

    notBool(args){
        return !Scratch.Cast.toBoolean(args.not1);
    }

    inBool(args){
        // 1. 将输入强制转换为字符串（防止玩家塞入数字或其他类型）
    const str1 = String(args.str1);
    const str2 = String(args.str2);
    // 2. 转换为小写后，判断是否包含（完美复刻 Scratch 原版逻辑）
    return str2.toLowerCase().includes(str1.toLowerCase());
    }

    ifC(args, util) {
        // util.startBranch(1, false) 的意思是：如果条件为真，立刻执行内部包裹的第1个分支
        // 参数2设为 false 表示这不是循环
        if (Scratch.Cast.toBoolean(args.cond)) {
            util.startBranch(1, false); 
        }
    }

    ifelseC(args, util) {
        if (Scratch.Cast.toBoolean(args.cond)) {
            util.startBranch(1, false); 
        } else {
            util.startBranch(2, false); 
        }
    }

    elifC(args, util) {
        if (Scratch.Cast.toBoolean(args.cond1)) {
            util.startBranch(1, false);
        } else if (Scratch.Cast.toBoolean(args.cond2)) {
            util.startBranch(2, false);
        } else {
            util.startBranch(3, false);
        }
    }
}
        // ===================== 积木执行方法区域 =====================
        // 说明：
        // 1. 每个积木对应一个方法，方法名必须与积木的opcode完全一致
        // 2. 方法参数args：包含积木定义的所有参数（如args.PARAM1）
        // 3. 示例格式（可删除，按需添加）：
        /*
        // 示例：命令积木方法（无返回值）
        customCommand(args) {
            // 积木执行逻辑写在这里
            console.log("自定义命令执行", args);
        }

        // 示例：报告积木方法（有返回值）
        customReporter(args) {
            // 积木执行逻辑，最后返回结果
            return "自定义返回值";
        }
        */
        Scratch.extensions.register(new PythonCode());

})(Scratch); // 传入Scratch全局对象，完成扩展封装