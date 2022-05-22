$(document).ready(function () {
    Math.radians = function (degrees) {
        return degrees * Math.PI / 180;
    };
    Math.degrees = function (radians) {
        return radians * 180 / Math.PI;
    };
    var camera
    var scene
    var init = function () {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            45,
            $(window).width() / $(window).height(),
            0.1,
            10000
        );
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xc3c3c3);
        renderer.setSize($(window).width(), $(window).height());
        $("#root").append(renderer.domElement);
        camera.position.set(300, 200, 300)
        camera.lookAt(scene.position);
        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', function () {
            renderer.render(scene, camera)
        });
        var check = false
        var client = io();
        client.on("onconnect", function (data) {
            alert(data.clientName)
        })
        $(document).on("mousemove", function (e) {
            client.emit("mouseposition", {
                posX: e.clientX,
                posY: e.clientY
            })
        })
        var t = 0
        var x = 0
        var y = 0
        var z = 0
        var rr = 0
        var v
        var g
        var alpha
        var drgania = 0
        var siatka = new Siatka()
        scene.add(siatka.getLineCont())
        var armata = new Armata()
        var cannon = armata.getCannon()
        scene.add(cannon)
        var kula = new Kula()
        scene.add(kula.getBall())

        $("#oX").on("input", function () {
            cannon.rotation.y = $("#oX").val() / 57.3
            y = -1 * $("#oY").val() * (Math.PI / 180)
        })

        $("#oY").on("input", function () {
            dwg = $("#oY").val()
            armata.rotateRura(dwg)
            alpha = $("#oY").val() * Math.PI / 180
        }).trigger("input")

        $("#fire").click(function () {
            check = true
            t = 0;
            g = $("#G").val()
            v = $("#speed").val()
            rr = 0
        })

        function render() {
            var cannonDirVect = cannon.getWorldDirection()
            if (check == false) {
                x = 60 * Math.cos($("#oY").val() / 57.3) * Math.sin($("#oX").val() / 57.3)
                y = 57.3 * Math.sin($("#oY").val() / 57.3)
                z = 60 * Math.cos($("#oY").val() / 57.3) * Math.cos($("#oX").val() / 57.3)
                kula.getBall().position.set(x, y, z)
            }
            else if (check == true) {
                if (rr > -1.90) {
                    rr -= 0.05;
                    if (rr > -1) {
                        cannon.translateZ(-1);
                        //cannon.rotateX(Math.radians(-1.5));
                    } else {
                        cannon.translateZ(1);
                        //cannon.rotateX(Math.radians(1.5));
                    }
                }
                t += 0.1
                x = 60 * Math.cos($("#oY").val() / 57.3) * Math.sin($("#oX").val() / 57.3) + v * t * Math.cos($("#oY").val() / 57.3) * cannonDirVect.x
                y = 57.3 * Math.sin($("#oY").val() / 57.3) + v * t * Math.sin($("#oY").val() / 57.3) - ((g * t * t) / 2)
                z = 60 * Math.cos($("#oY").val() / 57.3) * Math.cos($("#oX").val() / 57.3) + v * t * Math.cos($("#oY").val() / 57.3) * cannonDirVect.z
                kula.getBall().position.set(x, y, z)

                if (kula.getBall().position.y <= -5) {
                    siatka.getLineCont().position.set(Math.sin(drgania), Math.sin(drgania), Math.sin(drgania))
                    drgania++

                    if (drgania == 50) {
                        t = 0
                        check = false
                        drgania = 0
                        siatka.getLineCont().position.set(0, 0, 0)
                    }
                }
            }
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        render();
    }
    init();
})