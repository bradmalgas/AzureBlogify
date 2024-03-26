<script setup lang="ts">
import { ref } from 'vue';

const post = ref(
    {
        id: 7,
        title: "If you're reading this, survery says - It's too late!",
        author: "Brad Malgas",
        date: "14 May 2024",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet pellentesque sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in lacus eget sapien tincidunt maximus. Sed posuere odio mi, nec dictum est luctus ac. Sed pharetra ante a lorem luctus rhoncus. Cras vitae ultrices ex. Nullam vel mattis arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut sed posuere tortor. Nunc sollicitudin orci ullamcorper, fringilla dolor in, porta nisi. Aliquam dapibus, purus nec fringilla facilisis, ligula nisi bibendum nulla, et sollicitudin dui elit non sem. Integer vehicula pulvinar odio, sed accumsan dui mollis in. Fusce orci felis, porta id elit a, dictum ultricies neque. Etiam bibendum felis in nunc posuere, a gravida nibh vulputate. Etiam imperdiet dolor ut neque tincidunt pellentesque. Praesent feugiat nec est non venenatis. Nulla posuere pretium orci, vel porta augue scelerisque non. Nulla eleifend dui mauris, vitae semper metus convallis id. Nullam nibh sapien, laoreet sit amet risus vel, accumsan convallis mauris. Aliquam vitae laoreet quam. Cras pellentesque sem eu turpis congue vestibulum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Fusce dignissim velit a libero eleifend laoreet. Cras a dui purus. Maecenas at porta nulla, ut tristique lectus. Proin molestie suscipit sem nec condimentum. Integer pulvinar nulla sem. Nulla molestie dui id est dictum, eu aliquam nunc dignissim. Integer et venenatis urna. Fusce ac nisl finibus neque aliquam volutpat. Suspendisse ultrices condimentum massa, eu tempor sem posuere eu. Curabitur tincidunt nec elit eget sagittis. Nulla luctus lacinia metus vitae posuere. Maecenas dignissim consectetur aliquet.Aliquam lobortis elementum elit vel consequat. Sed euismod enim non tellus eleifend, a maximus arcu fringilla. Quisque faucibus odio diam, eget volutpat dui cursus ac. Quisque sagittis diam lectus, varius tempor arcu aliquam id. In ac tincidunt magna. Cras malesuada ex et elementum sagittis. Nam a mollis quam. Ut suscipit vel leo ut mattis. Aliquam pellentesque vestibulum est, quis blandit tellus efficitur in. Integer sed eleifend odio. Nulla facilisi. Suspendisse vestibulum auctor sapien, vel interdum erat scelerisque sit amet. Cras diam dui, euismod in dui id, gravida laoreet mauris. Phasellus mollis, arcu nec varius malesuada, massa leo scelerisque tellus, id lacinia ligula turpis non dolor. Suspendisse eu neque pulvinar, rutrum nisl a, bibendum dui.Etiam non quam gravida, suscipit diam et, semper odio. Nam varius ac erat sed tincidunt. Suspendisse eu orci ut risus posuere consectetur ullamcorper in mi. Maecenas tincidunt vehicula leo non sollicitudin. Ut euismod enim ac urna rhoncus egestas. Morbi rutrum arcu ac dolor euismod porta. Vivamus consequat dignissim feugiat. Vestibulum et nisi at arcu gravida gravida. Duis ac risus nec metus aliquam dictum.Quisque a magna ante. Pellentesque efficitur sagittis pretium. Nam aliquet convallis dolor, sed dignissim nisl vestibulum quis. Duis et bibendum enim. Aenean fringilla varius arcu, nec tristique ipsum molestie eu. Suspendisse euismod vulputate diam, in vulputate dolor. Nam et rutrum nisl.Quisque iaculis dolor urna. Ut a lectus eu tellus consequat tristique. Nam vitae tortor sit amet ex consectetur pulvinar. Vivamus congue nisl ac turpis egestas iaculis sed vitae velit. Fusce dignissim nunc sapien. Donec eu ante ac quam mattis feugiat in sed tellus. Nam nec varius purus. Fusce eu mi risus. Vestibulum scelerisque nunc eget magna ornare, sit amet sagittis orci imperdiet. Integer in iaculis neque. Sed vestibulum, augue pretium fermentum semper, ante nisl malesuada urna, non aliquam erat urna non lorem. Aenean ut venenatis lorem. Duis lacinia massa vitae placerat viverra. Curabitur lectus libero, pharetra quis lorem in, porta euismod turpis. Nam sed tristique sapien.Curabitur ac imperdiet velit, eleifend tempor elit. Cras sed dolor pulvinar, porttitor quam vel, vehicula enim. Donec luctus, massa quis malesuada lacinia, quam ante maximus enim, ac iaculis ante odio sed ex. Aenean non tincidunt purus, at consectetur dolor. Integer nisl ex, gravida ut sollicitudin ut, convallis a lacus. In sed tellus sapien. Ut lectus tortor, pellentesque vel iaculis nec, aliquet sed magna. Cras vel neque mollis, lacinia massa nec, imperdiet arcu.Curabitur porta tortor tincidunt, pellentesque est id, interdum nibh. Vestibulum ac arcu vitae justo cursus ultrices quis nec ligula. Phasellus eu ipsum sit amet ligula dictum vehicula id eu odio. Pellentesque eros leo, ullamcorper vel tincidunt vitae, venenatis sit amet eros. Donec tempus ligula vitae turpis pretium pretium. Aliquam euismod erat id nisi tempor semper. Donec iaculis ligula sed felis interdum, a facilisis ante fermentum. Proin iaculis justo velit, sed sollicitudin diam tristique vel. Fusce efficitur tortor risus, ac sollicitudin orci facilisis quis. Nullam varius id justo id consectetur.Vivamus luctus ultricies massa, nec aliquet metus ornare ut. Etiam ut sodales arcu, vitae condimentum elit. Phasellus tempus auctor purus vitae rhoncus. Aenean ultrices libero ut sapien sagittis, nec tempus augue posuere. Phasellus sed nibh ut orci elementum volutpat vel ut nibh. Vestibulum ut posuere purus. Aliquam non nunc eu velit pretium efficitur. Aliquam hendrerit euismod odio eget venenatis. Cras arcu ipsum, luctus nec imperdiet eu, ornare quis sapien."
    }
)
</script>


<template>
    <div class="flex justify-center mx-10">
        <div class="flex flex-col items-center pt-5 mx-10 max-w-[1024px]">
            <div>
                <img class="max-w-full h-auto" src="../assets/images/placeholder-image.png" alt="">
                <h1
                    class="flex lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:text-3xl text-xl my-1 font-bold leading-tight">
                    {{ post.title }}
                </h1>
                <div class="flex my-3 space-x-4">
                    <div
                        class="flex justify-center md:w-24 md:h-24 w-16 h-16 rounded-full border-2 border-neutral-900 p-1">
                        <img class="" src="../assets/images/user-placeholder-image.png" alt="">
                    </div>
                    <div class="flex flex-col justify-center">
                        <p class="md:text-lg text-sm font-semibold">{{ post.author }}</p>
                        <p class="md:text-sm text-xs">{{ post.date }}</p>
                    </div>
                </div>
            </div>
            <div>
                <p class="md:text-xl">
                    {{ post.content }}
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped></style>